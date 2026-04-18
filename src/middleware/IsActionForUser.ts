
import { NextFunction, Response, Request} from "express";

export const IsActionForUser=(req: Request, res: Response, next: NextFunction)=>{

const userId = req.params.userId
if(req.payload.sub  !== userId){
  return res.status(403).json("cannot fulfill your request")
}
next()
};


