import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

class UserController {
  async getOneUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const oneUser = await userRepository.findOneBy({ idUser: Number(id) });

    if(!oneUser){
      return res.status(404).send({message: "user not found"})
    }

    return res.status(200).send(oneUser);
  }

  async getAllUser(req: Request, res: Response): Promise<Response> {
    const allUser = await userRepository.find();

    if(!allUser){
      return res.status(404).send({message: "users not found"})
    }

    return res.status(200).send(allUser);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, lastName, email, password } = req.body;

    const updateUser = await userRepository.findOneBy({ idUser: Number(id) });

    if (!updateUser) {
      return res.status(404);
    }

    updateUser.name = name;
    updateUser.lastName = lastName;
    updateUser.email = email;
    updateUser.password = password;

    const userUpdated = await userRepository.save(updateUser);

    return res.status(200).send(userUpdated);
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = await userRepository.findOneBy({ idUser: Number(id) });

    if (!deleteUser) {
      return res.status(404);
    }

    const userDeleted = await userRepository.remove(deleteUser);

    return res.status(200).send(userDeleted);
  }
}

export default new UserController();
