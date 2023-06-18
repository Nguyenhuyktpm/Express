import express, { Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Recipes } from "../entity/Recipes";
import { Ingredients } from "../entity/Ingredients";
import { request } from "http";

export const Router = express.Router();

const recipeRepository = AppDataSource.getRepository(Recipes)
const ingreRepository = AppDataSource.getRepository(Ingredients)

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error));
    
Router.get("/", async (req: Request, res: Response) => {
    try {
        // const items: Item[] = await ItemService.findAll();
        const items = await recipeRepository.find();
        
        res.render("index",{items});
    } catch (e:any) {
        res.status(500).send(e.message);
    }
    });


Router.post("/", async (req: Request, res: Response) => {
    try {
       
        const item = req.body
        //recipe
        const recipes = new Recipes()
        recipes.title = item.title
        recipes.imageUrl=item.image
        recipes.publisher=item.publisher
        recipes.timetocook=item.cookingTime
        recipes.publisherUrl=item.PublisherURL
        await recipeRepository.create(recipes)
        
        //inre
        const ingredient = new Ingredients()
        ingredient.ingredients1 = item.ingredient1
        ingredient.ingredients2 = item.ingredient2
        ingredient.ingredients3 = item.ingredient3
        ingredient.ingredients4 = item.ingredient4
        ingredient.ingredients5 = item.ingredient5
        ingredient.ingredients6 = item.ingredient6
        ingredient.id_recip = recipes
        await ingreRepository.create(ingredient)

        const items = await recipeRepository.find() 
        
        res.render("index",{items})
    } catch (e:any) {
        res.status(500).send(e.message);
    }
    });


Router.get("/:id", async (req: Request, res: Response) => {
    const id: any = parseInt(req.params.id, 10);
    try {
        if(!isNaN(id))
        {
        const item = await ingreRepository.findOneBy({
           id_recip:id
        });
        const reci = await recipeRepository.findOneBy({
            id:id
        })
        const igre = [item.ingredients1,item.ingredients2,item.ingredients3,item.ingredients4,item.ingredients5,item.ingredients6]
        if(item){
        res.render("detail",{igre,reci});   
        }
        }
        else if(req.params.id=="add")
        {
            res.render("addRecipe")
        }
    }
        catch (e:any) {
        res.status(500).send(e.message);
    }
    });


Router.get("/edit/(:id)" ,async (req :Request,res: Response)=>{
    const id: any = parseInt(req.params.id, 10);
    const recip = await recipeRepository.findOneBy({
        id: id
    })

    const ingre = await ingreRepository.findOneBy({
        id_recip: id
    })
    console.log(ingre)

    res.render("editRecipe",{recip,ingre})
})

Router.post("/edit/:id",async (req :Request,res: Response) =>{
    const id : any = parseInt(req.params.id,10);
    const recipeUpdate = req.body;
    const ingreUpdate = req.body;
    const ingreexist = ingreRepository.findOneBy({
        id_recip:id
    })
    const exist = recipeRepository.findOneBy({
        id:id 
    })
    if(exist){
        await recipeRepository.update(id,recipeUpdate);
        
    }

});
