import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

import jwt from "jsonwebtoken";

class LoginController {
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userExists = await userRepository.findOne({
      where: {
        email,
        password,
      },
    });

    if (userExists) {
      const token = jwt.sign({ email, password }, String(process.env.KEY), {
        expiresIn: 240,
      });

      return res.cookie("jwt", token).status(200).send({ token: token });
    } else {
      return res.status(401).send({ message: "incorrect email or password" });
    }
  }
}

export default new LoginController();
