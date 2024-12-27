import Input from '../ui/Input';
import { CircleUser, KeyRound, Mail } from 'lucide-react';

function RegisterForm() {
  return (
    <>
      <Input
        id="fullname"
        name="fullname"
        type="text"
        placeholder="Full Name"
        Icon={<CircleUser />}
      />
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        Icon={<Mail />}
      />
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        Icon={<KeyRound />}
      />
      <button className="btn-dark center mt-14" type="submit">
        Register
      </button>
    </>
  );
}

export default RegisterForm;
