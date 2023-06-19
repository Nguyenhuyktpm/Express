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
import session from "express-session";
export const Router = express.Router();
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(paginate.middleware(9, 50));

Router.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
const recipeRepository = AppDataSource.getRepository(Recipes);
const ingreRepository = AppDataSource.getRepository(Ingredients);
const userRepository = AppDataSource.getRepository(user);

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
//Get all recipe 
//Login

Router.post("/login", async (req: Request, res: Response) => {
  const { username: name, password } = req.body;
  req.session.loggedIn = false;
  try {
    const user = await userRepository.findOne({ where: { name } });
    if (!user) {
      res.render("login", { error: "Tài khoản không tồn tại" });
      return;
    }
    // Mã hóa mật khẩu
    // const password = "admin";
    // const saltRounds = 10;
    // const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.render("login", { error: "Mật khẩu không chính xác" });
      return;
    }
    if (req.session) {
      // Thực hiện các thao tác với session
      req.session.loggedIn = true; // Đặt trạng thái đăng nhập thành true trong session
      req.session.user = {
        name,
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
      console.log(req.session.user);
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
// add a recipe or ingridient
Router.post("/", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    //recipe
    const recipes = new Recipes();
    recipes.title = item.title;
    recipes.imageUrl = item.image;
    recipes.publisher = item.publisher;
    recipes.timetocook = item.cookingTime;
    recipes.publisherUrl = item.PublisherURL;
    await recipeRepository.save(recipes);

    //inre
    const ingredient = new Ingredients();
    ingredient.ingredients1 = item.ingredient1;
    ingredient.ingredients2 = item.ingredient2;
    ingredient.ingredients3 = item.ingredient3;
    ingredient.ingredients4 = item.ingredient4;
    ingredient.ingredients5 = item.ingredient5;
    ingredient.ingredients6 = item.ingredient6;
    ingredient.id_recip = recipes;
    await ingreRepository.save(ingredient);

    

    res.redirect("/");
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
//get recipe or open form add
Router.get("/:id", async (req: Request, res: Response) => {
  const id: any = parseInt(req.params.id, 10);
  try {
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
    } else if (req.params.id == "add") {
        res.render("addRecipe");
    }
      else if (req.params.id == "login") {
        res.render("login");
      }
    
    
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});
// open form edit for recipe and ingredients
Router.get("/edit/(:id)", async (req: Request, res: Response) => {
  const id: any = parseInt(req.params.id, 10);
  const recip = await recipeRepository.findOneBy({
    id: id,
  });

  const ingre = await ingreRepository.findOneBy({
    id_recip: recip,
  });
  

  res.render("editRecipe", { recip, ingre });
});
//update recipe and ingredients
Router.post("/update/:id", async (req: Request, res: Response) => {
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
  await recipeRepository.save(recipeUpdate);
  //
  ingreUpdate.ingredients1 = item.ingredient1;
  ingreUpdate.ingredients2 = item.ingredient2;
  ingreUpdate.ingredients3 = item.ingredient3;
  ingreUpdate.ingredients4 = item.ingredient4;
  ingreUpdate.ingredients5 = item.ingredient5;
  ingreUpdate.ingredients6 = item.ingredient6;
  ingreUpdate.id_recip = recipeUpdate;

  await ingreRepository.save(ingreUpdate);

  const items = await recipeRepository.find();
  res.redirect("/");
});

//Delete  recipe
Router.post("/delete/(:id)", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const recipe = await recipeRepository.findOneBy({
    id: id,
  });
  const ingre = await ingreRepository.findOneBy({
    id_recip: recipe,
  });
  
  if(ingre)
  {
    await ingreRepository.remove(ingre);
  }
  await recipeRepository.remove(recipe);
  res.redirect("/");
});

//searching recipe
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

