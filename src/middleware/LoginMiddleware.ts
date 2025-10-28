import { Request, Response, NextFunction } from "express";

class LoginMiddleware{
    async verifyLoginrUser(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
            const { email, password } = req.body;
                
            if( !email || !password ){
               return res.status(400).send({message: "all fields are required"})
            }
    
            next()
        }
}

export default new LoginMiddleware()