import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Recipes } from "../entity/Recipes";
import { Ingredients } from "../entity/Ingredients";
import { request } from "http";
import bodyParser from "body-parser";
import paginate from "express-paginate";
import { Like } from "typeorm";
import bcrypt from "bcrypt";
import { user } from "../entity/user";
import session, { SessionOptions } from "express-session";
import { userInfo } from "os";
import { infoUser } from "../entity/infoUser";
export const Router = express.Router();
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(paginate.middleware(9, 50));

const sessionOptions: SessionOptions = {
  secret: "your-secret-key", // Thay thế bằng một khóa bảo mật bất kỳ
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 60000,
  }, // Thời gian sống session là 60 giây (đơn vị tính bằng mili giây)
};
const recipeRepository = AppDataSource.getRepository(Recipes);
const ingreRepository = AppDataSource.getRepository(Ingredients);
const userRepository = AppDataSource.getRepository(user);
const userInfoRepository = AppDataSource.getRepository(infoUser);

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
//Login

Router.use(session(sessionOptions));
Router.use((req: Request, res: Response, next) => {
  if (req.session) {
    // Kiểm tra nếu đã quá thời gian sống cho phép
    const currentTime = new Date().getTime();
    const sessionExpirationTime =
      req.session.lastActiveTime + sessionOptions.cookie.maxAge;
    if (currentTime > sessionExpirationTime) {
      // Hủy bỏ session
      req.session.destroy((err) => {
        if (err) {
          console.error("Lỗi khi hủy bỏ session:", err);
        }
      });
    } else {
      // Cập nhật thời gian hoạt động mới nhất cho session
      req.session.lastActiveTime = currentTime;
    }
  }
  next();
});

Router.post("/login", async (req: Request, res: Response) => {
  const { username: username, password } = req.body;
  try {
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      res.render("login", { error: "Tài khoản không tồn tại" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.render("login", { error: "Mật khẩu không chính xác" });
      return;
    }
    if (req.session) {
      // Kiểm tra nếu session chưa có thời gian hoạt động

      if (!req.session.lastActiveTime) {
        req.session.lastActiveTime = new Date().getTime();
      }
      console.log(user);
      const infoUser = await userInfoRepository.findOneBy({
        user: user,
      });
      // Thực hiện các thao tác với session
      req.session.loggedIn = true; // Đặt trạng thái đăng nhập thành true trong session
      req.session.user = {
        idUser: user.id,
        idInfoUser: infoUser.id,
        username,
        role: user.role,
      };
    }
    res.redirect("/"); // Chuyển hướng đến trang dashboard
    // Đăng nhập thành công, thực hiện các logic bổ sung
  } catch (error) {
    console.error("Error:", error);
    res.render("login", { error: "Đã xảy ra lỗi" });
  }
});

Router.get("/", async (req: Request, res: Response) => {
  try {
    if (req.session.loggedIn) {
      const items = await recipeRepository.find();
      const limit: number = 9; // Số lượng công thức hiển thị trên mỗi trang
      const itemCount: number = items.length; // Tổng số công thức
      const pageCount: number = Math.ceil(itemCount / limit); // Tổng số trang
      const currentPage: any = req.originalUrl.match(/\d+/g)?.[0] || 1; // Trang hiện tại, mặc định là 1
      const startIndex: number = (currentPage - 1) * limit; // Vị trí bắt đầu của danh sách công thức trên trang hiện tại
      const endIndex: number = startIndex + limit; // Vị trí kết thúc của danh sách công thức trên trang hiện tại
      const recipeList = items.slice(startIndex, endIndex);
      console.log(req.session.user);
      const role = req.session.user.role;
      const nameUser = req.session.user.username;
      res.render("index", {
        nameUser,
        role,
        items: recipeList,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, currentPage),
      });
    } else {
      res.redirect("/login");
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
//đăng kí
Router.post("/register", async (req: Request, res: Response) => {
  try {
    const infoUser1 = req.body;
    // Mã hóa mật khẩu
    const saltRounds = 10;
    const passwordHass = bcrypt.hashSync(infoUser1.password, saltRounds);
    const users = new user();
    users.username = infoUser1.username;
    users.password = passwordHass;
    users.role = "member";
    await userRepository.save(users);
    const detailUser = new infoUser();
    detailUser.name = infoUser1.name;
    detailUser.phoneNumber = infoUser1.phoneNumber;
    detailUser.email = infoUser1.email;
    detailUser.user = users;
    await userInfoRepository.save(detailUser);
    res.redirect("/login");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
//User**********************************/
Router.get("/user", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    const user = await userRepository.find();
    const userInfo = await userInfoRepository.find();
    const role = req.session.user.role;
    const nameUser = req.session.user.username;
    const arrayUser = user.map((item, index) => {
      return [user[index], userInfo[index]];
    });
    res.render("user/listUser", { arrayUser, role, nameUser });
  } else {
    res.redirect("/login");
  }
});
Router.get("/editUser", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    const role = req.session.user.role;
    const nameUser = req.session.user.username;
    const infoUser = await userInfoRepository.findOneBy({
      id: req.session.user.idInfoUser,
    });
    console.log(infoUser.email);
    res.render("user/editInfoUser", { role, nameUser, infoUser });
  } else {
    res.redirect("/login");
  }
});
Router.post("/updateUser", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    const item = req.body;
    const infoUser = await userInfoRepository.findOneBy({
      id: req.session.user.idInfoUser,
    });
    infoUser.name = item.name;
    infoUser.phoneNumber = item.phoneNumber;
    infoUser.email = item.email;
    userInfoRepository.save(infoUser);
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
//changePassword
Router.get("/changePassword", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    const role = req.session.user.role;
    const nameUser = req.session.user.username;
    res.render("user/changePassword", { role, nameUser });
  } else {
    res.redirect("/login");
  }
});
Router.post("/updatePassword", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    const item = req.body;
    const user = await userRepository.findOneBy({
      id: req.session.user.idUser,
    });
    const passwordMatch = await bcrypt.compare(
      item.currentPassword,
      user.password
    );
    if (item.newPassword != item.confirmPassword) {
      res.render("/changePassword", {
        error: "vui lòng nhập lại đúng mật khẩu mới",
      });
      return;
    }
    if (!passwordMatch) {
      res.render("/changePassword", { error: "Mật khẩu không chính xác" });
      return;
    }
    const saltRounds = 10;
    const passwordHass = bcrypt.hashSync(item.newPassword, saltRounds);
    user.password = passwordHass;
    userRepository.save(user);
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});
//*************************************** */
Router.get("/add", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    const role = req.session.user.role;
    const nameUser = req.session.user.username;
    res.render("addRecipe", { role, nameUser });
  } else {
    res.redirect("/login");
  }
});
Router.get("/login", async (req: Request, res: Response) => {
  req.session.loggedIn = false;
  res.render("login");
});
Router.get("/register", async (req: Request, res: Response) => {
  res.render("register");
});
Router.post("/", async (req: Request, res: Response) => {
  try {
    if (req.session.loggedIn) {
      const item = req.body;
      //recipe
      const recipes = new Recipes();
      recipes.title = item.title;
      recipes.imageUrl = item.image;
      recipes.publisher = item.publisher;
      recipes.timetocook = item.cookingTime;
      recipes.publisherUrl = item.PublisherURL;
      await recipeRepository.create(recipes);

      //inre
      const ingredient = new Ingredients();
      ingredient.ingredients1 = item.ingredient1;
      ingredient.ingredients2 = item.ingredient2;
      ingredient.ingredients3 = item.ingredient3;
      ingredient.ingredients4 = item.ingredient4;
      ingredient.ingredients5 = item.ingredient5;
      ingredient.ingredients6 = item.ingredient6;
      ingredient.id_recip = recipes;
      await ingreRepository.create(ingredient);

      const items = await recipeRepository.find();

      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

Router.get("/:id", async (req: Request, res: Response) => {
  const id: any = parseInt(req.params.id, 10);
  try {
    if (req.session.loggedIn) {
      const role = req.session.user.role;
      const nameUser = req.session.user.username;
      if (!isNaN(id)) {
        const reci = await recipeRepository.findOneBy({
          id: id,
        });
        const item = await ingreRepository.findOneBy({
          id_recip: reci,
        });

        const igre = [
          item.ingredients1,
          item.ingredients2,
          item.ingredients3,
          item.ingredients4,
          item.ingredients5,
          item.ingredients6,
        ];
        if (item) {
          res.render("detail", { role, igre, reci, nameUser });
        }
      }
    } else {
      res.redirect("/login");
    }
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

Router.get("/edit/(:id)", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    const role = req.session.user.role;
    const nameUser = req.session.user.username;
    const id: any = parseInt(req.params.id, 10);
    const recip = await recipeRepository.findOneBy({
      id: id,
    });

    const ingre = await ingreRepository.findOneBy({
      id_recip: recip,
    });
    res.render("editRecipe", { recip, ingre, role, nameUser });
  } else {
    res.redirect("/login");
  }
});

Router.post("/update/:id", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    const id: any = parseInt(req.params.id, 10);
    const item = req.body;
    const recipeUpdate = await recipeRepository.findOneBy({
      id: id,
    });
    const ingreUpdate = await ingreRepository.findOneBy({
      id_recip: recipeUpdate,
    });

    //
    recipeUpdate.title = item.title;
    recipeUpdate.imageUrl = item.image;
    recipeUpdate.publisher = item.publisher;
    recipeUpdate.publisherUrl = item.PublisherURL;
    recipeUpdate.timetocook = item.cookingTime;
    recipeRepository.save(recipeUpdate);
    //
    ingreUpdate.ingredients1 = item.ingredient1;
    ingreUpdate.ingredients2 = item.ingredient2;
    ingreUpdate.ingredients3 = item.ingredient3;
    ingreUpdate.ingredients4 = item.ingredient4;
    ingreUpdate.ingredients5 = item.ingredient5;
    ingreUpdate.ingredients6 = item.ingredient6;
    ingreUpdate.id_recip = recipeUpdate;

    ingreRepository.save(ingreUpdate);
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

//Delete  recipe
Router.delete("/(:id)", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    const id: number = parseInt(req.params.id, 10);
    const recipe = await recipeRepository.findOneBy({
      id: id,
    });
    const ingre = await ingreRepository.findOneBy({
      id_recip: recipe,
    });
    await ingreRepository.remove(ingre);
    await recipeRepository.remove(recipe);
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
});

// searching recipe
Router.post("/search", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    const name = req.body.search;

    const items = await recipeRepository.findBy({
      title: Like("%" + name + "%"),
    });
    // const items: Item[] = await ItemService.findAll();

    const limit: number = 9; // Số lượng công thức hiển thị trên mỗi trang
    const itemCount: number = items.length; // Tổng số công thức
    const pageCount: number = Math.ceil(itemCount / limit); // Tổng số trang
    const currentPage: any = req.originalUrl.match(/\d+/g)?.[0] || 1; // Trang hiện tại, mặc định là 1
    const startIndex: number = (currentPage - 1) * limit; // Vị trí bắt đầu của danh sách công thức trên trang hiện tại
    const endIndex: number = startIndex + limit; // Vị trí kết thúc của danh sách công thức trên trang hiện tại
    const recipeList = items.slice(startIndex, endIndex);
    const role = req.session.user.role;
    const nameUser = req.session.user.username;
    res.render("index", {
      role,
      nameUser,
      items: recipeList,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, currentPage),
    });
  } else {
    res.redirect("/login");
  }
});
