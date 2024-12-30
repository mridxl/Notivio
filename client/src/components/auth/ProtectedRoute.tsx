import { Navigate, useLocation } from 'react-router';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../atoms/authAtom';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isAuth, user } = useRecoilValue(authAtom);
  const location = useLocation();

  if (!isAuth || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
