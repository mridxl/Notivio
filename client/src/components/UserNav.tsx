import { Link } from 'react-router';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { toast } from 'sonner';
import AnimationWrapper from './AnimationWrapper';
import { authAtom } from '../atoms/authAtom';
import { logoutUser } from '../services/authService';

function UserNavigationPanel() {
  const resetAuth = useResetRecoilState(authAtom);
  const auth = useRecoilValue(authAtom);
  const username = auth.user?.username;

  const handleLogout = async () => {
    try {
      logoutUser();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
      console.error(error);
    }
    resetAuth();
  };

  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50"
    >
      <div className="absolute right-0 w-60 border border-grey bg-white duration-200">
        <Link to="/editor" className="link flex gap-2 py-4 pl-8 md:hidden">
          <i className="fi fi-rr-edit"></i>
          <p>Write</p>
        </Link>
        <Link to={`/user/${username}`} className="link py-4 pl-8">
          Profile
        </Link>
        <Link to="/dashboard/blogs" className="link py-4 pl-8">
          Dashboard
        </Link>
        <Link to="/settings/edit-profile" className="link py-4 pl-8">
          Settings
        </Link>
        <span className="absolute w-[100%] border-t border-grey"></span>
        <button
          className="w-full p-4 pl-8 text-left hover:bg-grey"
          onClick={handleLogout}
        >
          <h1 className="mb-1 text-xl font-bold">Logout</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
}

export default UserNavigationPanel;
