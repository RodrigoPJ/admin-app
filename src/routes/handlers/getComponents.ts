import { log } from "console";
import { Request, Response } from "express";

export default async function getComponents(req:Request, res:Response) {
    log(req.query);
    const userInfo = req.query;
    if (userInfo['user']) {
        res.status(200).json([userInfo.user, 'comp2']);
    } else {
        res.status(400).send('bad request');
    }
}