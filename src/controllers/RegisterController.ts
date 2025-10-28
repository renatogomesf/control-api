import { Request, Response } from "express";
import User from "../entity/User";
import { userRepository } from "../repositories/userRepository";

class RegisterController {
    async registerUser(req: Request, res: Response): Promise<Response> {
        const { name, lastName, email, password } = req.body;

        const user = new User();

        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.password = password;

        const userCreated = await userRepository.save(user);

        return res.status(201).send(userCreated);
    }
}

export default new RegisterController()