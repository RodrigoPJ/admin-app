import { log } from "console";
import { Request, Response } from "express";
import User from "../../database/schemas/User";

export default async function getAllUsers(req:Request, res:Response) {
    log(req.query);
    const userInfo = req.query;
    try {
        if (userInfo['user']) {
        const allUsers = await User.find()
        res.status(200).json([userInfo.user, 'comp2', allUsers]);
    } else {
        res.status(400).send('bad request');
    }
    } catch (error) {
        res.status(400).json(error);
    }
    
}