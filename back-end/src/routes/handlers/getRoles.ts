import { Request, Response } from "express";

export default function (req: Request, res:Response){
    console.log(req);
    res.status(200).json({message:'its working'});
}
