import { log } from "console";
import { Request, Response } from "express";
import {components} from '../../content/components';

export default async function getComponents(req:Request, res:Response) {
    log(req.query);
    const userInfo = req.query;
    try {
        if (userInfo['user']) {
        res.status(200).json([userInfo.us, 'comps', components]);
    } else {
        res.status(400).send('bad request');
    }
    } catch (error) {
        res.status(400).json(error);
    }
}