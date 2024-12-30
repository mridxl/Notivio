import Input from '../ui/Input';
import { Mail, KeyRound } from 'lucide-react';

function LoginForm() {
  return (
    <>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        Icon={Mail}
      />
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        Icon={KeyRound}
      />
      <button className="btn-dark center mt-14" type="submit">
        Login
      </button>
    </>
  );
}

export default LoginForm;
