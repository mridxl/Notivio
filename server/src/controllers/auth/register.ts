import { z } from 'zod';
import bcrypt from 'bcrypt';
import type { Request, RequestHandler, Response } from 'express';
import User, { type IUser } from '../../models/User.model';
import { MongoServerError } from 'mongodb';
import generateUsername from '../../utils/generateUsername';
import { registerSchema, type RegisterSchemaType } from '../../zodSchemas/authSchemas';
import { parseZodError } from '../../utils/parseZodError';
import generateToken from '../../utils/generateToken';

const registerController: RequestHandler = async (req: Request, res: Response) => {
  try {
    registerSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ error: parseZodError(error as z.ZodError) });
    return;
  }

  const { fullname, email, password } = req.body as RegisterSchemaType;
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const username = await generateUsername(email);
    const newUser: IUser | null = await User.create({
      personalInfo: {
        fullname,
        email,
        passwordHash,
        username,
      },
    });

    if (newUser) {
      generateToken(res, newUser);
      res.status(201).json({
        message: 'User created successfully',
        user: {
          profileImg: newUser.personalInfo.profileImg,
          username: newUser.personalInfo.username,
          fullname: newUser.personalInfo.fullname,
        },
      });
      return;
    } else {
      res.status(400).json({ error: 'User not created' });
      return;
    }
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      res.status(401).json({
        error: 'Email already exists. Try again with a different email.',
      });
      return;
    }
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
    return;
  }
};

export default registerController;
