import bcrypt from 'bcrypt';
import { z } from 'zod';
import type { Request, RequestHandler, Response } from 'express';
import User, { IUser } from '../../models/User.model';
import { loginSchema, type LoginSchemaType } from '../../zodSchemas/authSchemas';
import { parseZodError } from '../../utils/parseZodError';
import generateToken from '../../utils/generateToken';

const loginController: RequestHandler = async (req: Request, res: Response) => {
  try {
    loginSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ error: parseZodError(error as z.ZodError) });
    return;
  }

  const { email, password } = req.body as LoginSchemaType;

  try {
    const user: IUser | null = await User.findOne({ 'personalInfo.email': email.toLowerCase() });

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.personalInfo.passwordHash);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    generateToken(res, user);

    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        profileImg: user.personalInfo.profileImg,
        username: user.personalInfo.username,
        fullname: user.personalInfo.fullname,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    return;
  }
};

export default loginController;
