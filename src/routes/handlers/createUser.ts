import { log } from 'console';
import { Request, Response } from 'express';
import User from '../../database/schemas/User';

export default async function createUser(req: Request, res: Response) {
  log('creating user');
  const userInfo = req.body;
  try {
    const { firstName, lastName, email, password, roles, managedUsers, manager } =
      userInfo;
    if (
      typeof firstName === 'string' &&
      typeof lastName === 'string' &&
      typeof email === 'string' &&
      typeof password === 'string' &&
      roles instanceof Array
    ) {
      const duplicateUser = await User.find({
        email: email
      });
      if (duplicateUser.length > 0) {
        res.status(402).send('duplicate user');
      } else {
        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = password;
        newUser.roles = roles;
        if (managedUsers instanceof Array) {
          newUser.managedUsers = managedUsers;
        }
        const savedUser = await newUser.save();
        if (manager) {
            const userManager = await User.findOne({
                email: manager
            });
            if(userManager) {
                if (userManager.managedUsers) {
                    const newManagedUsers = userManager.managedUsers;
                    newManagedUsers.push(email);
                    userManager.managedUsers = newManagedUsers;
                    const savedManager = await userManager.save();
                    log(savedManager)
                } else{
                    userManager.managedUsers = [email]
                    const savedManager = await userManager.save();
                    log(savedManager)
                }
            }
        }
        res.status(200).json(savedUser);
      }
    } else {
      res.status(400).send('bad request');
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
