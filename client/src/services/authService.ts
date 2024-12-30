import axios from 'axios';
import type {
  LoginSchemaType,
  RegisterSchemaType,
} from '../zodSchemas/authSchemas';

interface login {
  credentials: LoginSchemaType;
  type: 'login';
}

interface register {
  credentials: RegisterSchemaType;
  type: 'register';
}

export type AuthData = login | register;

export const authenticateUser = async ({ credentials, type }: AuthData) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL + '/auth';

  if (type === 'login') {
    const response = await axios.post(API_URL + '/login', credentials);
    return response.data;
  } else {
    const response = await axios.post(API_URL + '/register', credentials);
    return response.data;
  }
};

export const logoutUser = async () => {
  return await axios.get(import.meta.env.VITE_BACKEND_URL + '/auth/logout');
};
