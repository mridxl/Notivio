import { z } from 'zod';
import { Link, useLocation, useNavigate } from 'react-router';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import AnimationWrapper from '../components/AnimationWrapper';
import { AuthData, authenticateUser } from '../services/authService';
import { loginSchema, registerSchema } from '../zodSchemas/authSchemas';
import { toast } from 'sonner';
import { parseZodError } from '../lib/utils';
import { AxiosError } from 'axios';
import { authAtom, User } from '../atoms/authAtom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

type Props = {
  type: 'login' | 'register';
};

const AuthForm = ({ type }: Props) => {
  const [authState, setAuthState] = useRecoilState(authAtom);
  const { isAuth, user } = authState;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || '/';

  useEffect(() => {
    if (isAuth && user) {
      navigate(from);
    }
  }, [isAuth, navigate, from, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const credentials = Object.fromEntries(formData.entries());
    try {
      if (type === 'login') {
        loginSchema.parse(credentials);
      } else {
        registerSchema.parse(credentials);
      }
      const authData = { credentials, type };
      const data = await authenticateUser(authData as AuthData);
      const user = data.user as User;
      setAuthState({
        isAuth: true,
        user,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(parseZodError(error as z.ZodError));
        return;
      }
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error as string);
        return;
      }
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  return (
    <AnimationWrapper keyvalue={type}>
      <section className="h-cover flex items-center justify-center">
        <form
          className="w-[80%] max-w-[400px]"
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className="mb-14 pr-1 text-center font-gelasio text-4xl capitalize">
            {type === 'login' ? 'Welcome Back!' : 'Join Us Today'}
          </h1>

          {type !== 'login' ? (
            <>
              <RegisterForm />
              <p className="mt-6 text-center text-xl text-dark-grey">
                Already have an account?
                <Link to="/login" className="ml-1 text-xl text-black underline">
                  Login
                </Link>
              </p>
            </>
          ) : (
            <>
              <LoginForm />
              <p className="mt-6 text-center text-xl text-dark-grey">
                Don't have an account?
                <Link
                  to="/register"
                  className="ml-1 text-xl text-black underline"
                >
                  Register
                </Link>
              </p>
            </>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default AuthForm;
