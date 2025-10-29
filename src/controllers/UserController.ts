import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { UserDTO } from "../dtos/userDto/user.dto";
import { updateUserDTO } from "../dtos/userDto/updateUser.dto";

class UserController {
  async getOneUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const oneUser: UserDTO | null = await userRepository.findOneBy({ idUser: Number(id) });

    if(!oneUser){
      return res.status(404).send({message: "user not found"})
    }

    return res.status(200).send(oneUser);
  }

  async getAllUser(req: Request, res: Response): Promise<Response> {
    const allUser: UserDTO[] | null = await userRepository.find();

    if(!allUser){
      return res.status(404).send({message: "users not found"})
    }

    return res.status(200).send(allUser);
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, lastName, email, password }: updateUserDTO = req.body;

    const updateUser: UserDTO | null = await userRepository.findOneBy({ idUser: Number(id) });

    if (!updateUser) {
      return res.status(404);
    }

    updateUser.name = name;
    updateUser.lastName = lastName;
    updateUser.email = email;
    updateUser.password = password;

    const userUpdated: UserDTO = await userRepository.save(updateUser);

    return res.status(200).send(userUpdated);
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser: UserDTO | null = await userRepository.findOneBy({ idUser: Number(id) });

    if (!deleteUser) {
      return res.status(404);
    }

    const userDeleted: UserDTO = await userRepository.remove(deleteUser);

    return res.status(200).send(userDeleted);
  }
}

export default new UserController();
