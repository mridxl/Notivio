import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Layout from './Layout';
import ProtectedRoute from './components/ProtectedRoute';
import UserAuthForm from './pages/UserAuthForm';
import Editor from './pages/Editor';
import Home from './pages/Home';
import SearchPage from './pages/Search';
import PageNotFound from './pages/404';
import ProfilePage from './pages/Profile';
import BlogPage from './pages/BlogPage';
import SidebarNav from './components/SidebarNav';
import EditProfile from './pages/EditProfile';
import ChangePasswordPage from './pages/ChangePasswordPage';

const App = () => {
	return (
		<RecoilRoot>
			<Routes>
				<Route
					path="/editor/:id?"
					element={
						<ProtectedRoute>
							<Editor />
						</ProtectedRoute>
					}
				/>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route
						path="settings"
						element={
							<ProtectedRoute>
								<SidebarNav />
							</ProtectedRoute>
						}
					>
						<Route path="edit-profile" element={<EditProfile />} />
						<Route path="change-password" element={<ChangePasswordPage />} />
					</Route>
					<Route path="login" element={<UserAuthForm type="Login" />} />
					<Route path="register" element={<UserAuthForm type="Register" />} />
					<Route path="search/:query" element={<SearchPage />} />
					<Route path="user/:id" element={<ProfilePage />} />
					<Route path="blog/:id" element={<BlogPage />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</RecoilRoot>
	);
};

export default App;
