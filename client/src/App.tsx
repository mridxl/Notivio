import { Route, Routes } from 'react-router';
import Layout from './components/Layout';
import AuthForm from './pages/AuthForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<AuthForm type="Login" />} />
        <Route path="register" element={<AuthForm type="Register" />} />
      </Route>
    </Routes>
  );
}
