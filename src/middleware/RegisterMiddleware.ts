import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

class RegisterMiddleware {

    async verifyRegisterUser(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        const { name, lastName, email, password } = req.body;

        if(!name || !lastName || !email || !password ){
           return res.status(400).send({message: "all fields are required"})
        }

        const EmailExists = await userRepository.findOne({
            where: {
                email
            }
        })

        if(EmailExists){
            return res.status(400).send({message: "email already registered"})
        }

        next()
    }
}

export default new RegisterMiddleware()