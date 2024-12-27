import { Link } from 'react-router';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import AnimationWrapper from '../components/AnimationWrapper';
type Props = {
  type: 'Login' | 'Register';
};

const AuthForm = ({ type }: Props) => {
  return (
    <AnimationWrapper keyvalue={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]" noValidate>
          <h1 className="mb-14 pr-1 text-center font-gelasio text-4xl capitalize">
            {type === 'Login' ? 'Welcome Back!' : 'Join Us Today'}
          </h1>

          {type !== 'Login' ? <RegisterForm /> : <LoginForm />}

          {type !== 'Login' ? (
            <>
              <p className="mt-6 text-center text-xl text-dark-grey">
                Already have an account?
                <Link to="/login" className="ml-1 text-xl text-black underline">
                  Login
                </Link>
              </p>
            </>
          ) : (
            <p className="mt-6 text-center text-xl text-dark-grey">
              Don't have an account?
              <Link
                to="/register"
                className="ml-1 text-xl text-black underline"
              >
                Register
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default AuthForm;
