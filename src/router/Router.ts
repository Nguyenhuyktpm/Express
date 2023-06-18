import express, { Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Recipes } from "../entity/Recipes";
import { Ingredients } from "../entity/Ingredients";
import { request } from "http";
import bodyParser from "body-parser";
import paginate from "express-paginate";

export const Router = express.Router();
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(paginate.middleware(9, 50));

const recipeRepository = AppDataSource.getRepository(Recipes);
const ingreRepository = AppDataSource.getRepository(Ingredients);

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));

Router.get(
  "/",
  paginate.middleware(9, 50),
  async (req: Request, res: Response) => {
    try {
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
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

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

    res.render("index", { items });
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

Router.get("/:id", async (req: Request, res: Response) => {
  const id: any = parseInt(req.params.id, 10);
  try {
    if (!isNaN(id)) {
      const item = await ingreRepository.findOneBy({
        id_recip: id,
      });
      const reci = await recipeRepository.findOneBy({
        id: id,
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
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

Router.get("/edit/(:id)", async (req: Request, res: Response) => {
  const id: any = parseInt(req.params.id, 10);
  const recip = await recipeRepository.findOneBy({
    id: id,
  });

  const ingre = await ingreRepository.findOneBy({
    id_recip: id,
  });
  console.log(ingre);

  res.render("editRecipe", { recip, ingre });
});

Router.post("/edit/:id", async (req: Request, res: Response) => {
  const id: any = parseInt(req.params.id, 10);
  const recipeUpdate = req.body;
  const ingreUpdate = req.body;
  const ingreexist = ingreRepository.findOneBy({
    id_recip: id,
  });
  const exist = recipeRepository.findOneBy({
    id: id,
  });
  if (exist) {
    await recipeRepository.update(id, recipeUpdate);
  }
});
