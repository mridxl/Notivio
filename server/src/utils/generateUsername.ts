import { v4 as uuidv4 } from 'uuid';
import User, { IUser } from '../models/User.model';

const generateUsername = async (email: string) => {
  const baseUsername = email.split('@')[0];
  let username = baseUsername;

  // Ensure the username length is at least 3
  if (username.length < 3) {
    username += uuidv4().slice(0, 3);
  }

  let user: IUser | null = await User.findOne({ 'personalInfo.username': username.toLowerCase() });
  while (user) {
    username = `${baseUsername}${uuidv4().slice(0, 3)}`;
    user = await User.findOne({ 'personalInfo.username': username.toLowerCase() });
  }

  return username;
};

export default generateUsername;
