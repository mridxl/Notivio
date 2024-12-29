import jwt from 'jsonwebtoken';
import type { Response } from 'express';
import { IUser } from '../models/User.model';

const generateToken = (res: Response, user: IUser) => {
  const userId = user._id;
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: '15d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
  });

  return token;
};

export default generateToken;
