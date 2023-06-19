import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Recipes } from "../entity/Recipes";
import { Ingredients } from "../entity/Ingredients";
import { request } from "http";
import bodyParser from "body-parser";
import paginate from "express-paginate";
import { Like } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../entity/user";
import { userInfo } from "os";
import session, { SessionOptions } from "express-session";
import { infoUser } from "../entity/infoUser";
export const Router = express.Router();
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(paginate.middleware(9, 50));

const sessionOptions: SessionOptions = {
  secret: "your-secret-key", // Thay thế bằng một khóa bảo mật bất kỳ
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 60000 }, // Thời gian sống session là 60 giây (đơn vị tính bằng mili giây)
};
export const recipeRepository = AppDataSource.getRepository(Recipes);
const ingreRepository = AppDataSource.getRepository(Ingredients);
export const userRepository = AppDataSource.getRepository(User);
const userInfoRepository = AppDataSource.getRepository(infoUser)

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
  req.session.loggedIn = false;
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
      // Thực hiện các thao tác với session
      req.session.loggedIn = true; // Đặt trạng thái đăng nhập thành true trong session
      req.session.user = {
        username,
        id_user:user.id,
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
      // const items: Item[] = await ItemService.findAll();
      const items = await recipeRepository.find();
      const limit: number = 9; // Số lượng công thức hiển thị trên mỗi trang
      const itemCount: number = items.length; // Tổng số công thức
      const pageCount: number = Math.ceil(itemCount / limit); // Tổng số trang
      const currentPage: any = req.originalUrl.match(/\d+/g)?.[0] || 1; // Trang hiện tại, mặc định là 1
      const startIndex: number = (currentPage - 1) * limit; // Vị trí bắt đầu của danh sách công thức trên trang hiện tại
      const endIndex: number = startIndex + limit; // Vị trí kết thúc của danh sách công thức trên trang hiện tại
      const recipeList = items.slice(startIndex, endIndex);
      
      res.render("index", {
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
    const users = new User();
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
Router.get("/add", async (req: Request, res: Response) => {
  if (req.session.loggedIn) {
    res.render("addRecipe");
  } else {
    res.redirect("/login");
  }
});
Router.get("/login", async (req: Request, res: Response) => {
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
          res.render("detail", { igre, reci });
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
    const id: any = parseInt(req.params.id, 10);
    const recip = await recipeRepository.findOneBy({
      id: id,
    });

    const ingre = await ingreRepository.findOneBy({
      id_recip: recip,
    });
   

    res.render("editRecipe", { recip, ingre });
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

    const items = await recipeRepository.find();
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

Router.get("/user",async(req:Request ,res: Response)=>{
    const user = await userRepository.find();
    const userInfo = await userInfoRepository.find();
    res.render("listUser",{user,userInfo})
})
// searching recipe
Router.post("/search", async (req: Request, res: Response) => {
  const name = req.body.search;

  const items = await recipeRepository.findBy({
    title: Like("%" + name + "%"),
  });

  try {
    // const items: Item[] = await ItemService.findAll();
  
    const limit: number = 9; // Số lượng công thức hiển thị trên mỗi trang
    const itemCount: number = items.length; // Tổng số công thức
    const pageCount: number = Math.ceil(itemCount / limit); // Tổng số trang
    const currentPage: any = req.originalUrl.match(/\d+/g)?.[0] || 1; // Trang hiện tại, mặc định là 1
    const startIndex: number = (currentPage - 1) * limit; // Vị trí bắt đầu của danh sách công thức trên trang hiện tại
    const endIndex: number = startIndex + limit; // Vị trí kết thúc của danh sách công thức trên trang hiện tại
    const recipeList = items.slice(startIndex, endIndex);
    res.render("index", {
      items: recipeList,
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, currentPage),
    });
  } catch (e: any) {
    res.status(500).send(e.message);
  }

});



