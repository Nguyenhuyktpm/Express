import express, { Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Recipes } from "../entity/Recipes";
import { ingredients } from "../entity/Ingredients";
import { request } from "http";

export const Router = express.Router();

const recipeRepository = AppDataSource.getRepository(Recipes)
const ingreRepository = AppDataSource.getRepository(ingredients)

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


Router.post("/add", async (req: Request, res: Response) => {
    try {
        const item = req.body
        const info = [item.title,item.publisher,item.sourceURL,item.image,item.cookingTime]
        const ingre =[item.ingredient1,item.ingredient2,item.ingredient3,item.ingredient4,item.ingredient5,item.ingredient6]
        await recipeRepository.save(info);
        await ingreRepository.save(ingre);
        return res.render("index")
        
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
        else if(req.params.id=="login")
        {
            res.render("login")
        }
    }
        catch (e:any) {
        res.status(500).send(e.message);
    }
    });

Router.post("/:id",async (req :Request,res: Response) =>{
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
        await ingreRepository.update((await ingreexist).id,ingreUpdate);
    }

});
