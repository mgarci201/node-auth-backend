import {Request, Response} from 'express';
import { deleteUserById, getUserById, getUsers } from '../db/users';

// Consistent error logging
const logError = (error: any) => {
  console.error(error);
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);

  } catch (error) {
    logError(error);
    return res.sendStatus(400);
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const deletedUser = await deleteUserById(id);

    if(!deleteUser) {
      return res.status(404).json({error: 'User not found'});
    }

    return res.json(deletedUser);

  } catch (error) {
    logError(error);
    return res.sendStatus(400);
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const {username} = req.body;

    if(!username) {
      return res.sendStatus(400).json({error: 'Username is required'});
    }

    const user = await getUserById(id);

    if(!user) {
      return res.sendStatus(404).json({error: 'User not found'});
    }

    user.username = username;
    await user.save();

    return res.status(200).json(user).end();

  } catch (error) {
    logError(error);
    return res.sendStatus(500).json({error: 'Internal server error'});
  }
}
