import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

interface JwtPayload {
  email: string
  password: string
}

class AuthRoute {
  async auth(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).send({ message: "authorization required" });
    }

    if (typeof authorization == "string") {
      try {
        const isValid = jwt.verify(authorization, String(process.env.KEY)) as JwtPayload;

        const { email, password } = isValid;

        const userExists = await userRepository.findOne({
          where: {
            email,
            password,
          },
        });

        if (userExists) {
          res.status(200);
          next();
        }
      } catch (error) {
        res.status(401).send({ message: error });
      }
    }
  }
}

export default new AuthRoute();
