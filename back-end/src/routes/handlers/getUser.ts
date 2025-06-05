import { log } from "console";
import { Request, Response } from "express";
import User from "../../database/schemas/User";
import {components} from '../../content/components'

export default async function getUser(req:Request, res:Response) {
    log('getting user',req.query);
    const userInfo = req.query;
    try {
        if (userInfo['user'] && typeof userInfo.user === 'string') {
        const user = await User.findOne({
            email: userInfo.user
        })
        if(user?.email) {
            const userComponents: string[] = [];
            user.roles.forEach(el =>{
                if(components[el]  ) {
                    userComponents.push(...components[el]);
                }
            });
            res.status(200).json({...user.toJSON(), userComponents})

        } else {
            res.status(400).send('user not found');
        }

    } else {
        res.status(400).send('bad request');
    }
    } catch (error) {
        res.status(400).json(error);
    }
    
}