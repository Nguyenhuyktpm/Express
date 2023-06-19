import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
export const Router = express.Router();
import { User } from "../entity/user";
import { userRepository } from "./Router";
import { Session } from "inspector";
import { recipeRepository } from "./Router";

Router.post("/bookmark)" ,  async (req: Request,res:Response)=>{
    if (req.session.loggedIn){
        const idUser = req.session.id_user
        const idRecip = parseInt(req.params.id,10);
        
        const user = await userRepository.findOneBy({
            id:idUser,
        })
        const recipe = await recipeRepository.findOneBy({
            id:idRecip,
        })

        user.recipes = [recipe];
        recipe.users = [user];
    }
});