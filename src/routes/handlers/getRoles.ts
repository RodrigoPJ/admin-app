import { log } from "console";
import { Request, Response } from "express";
import {components} from '../../content/components'

export default async function getRoles(req:Request, res:Response) {
    log('getting roles');
    const userInfo = req.query;
    if (userInfo['user']) {
        const roles = Object.keys(components);
        res.status(200).json([userInfo.user, 'comp2', roles]);
    } else {
        res.status(400).send('bad request, no user in query');
    }
}