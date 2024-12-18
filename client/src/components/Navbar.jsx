import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../imgs/logo.png';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '../common/states/userAtom';
import UserNavigationPanel from './UserNavigationPanel';

const Navbar = () => {
	const [searchBoxshow, setSearchBoxshow] = useState(false);
	const [navPanel, setNavPanel] = useState(false);
	const searchRef = useRef(null);
	const navRef = useRef(null);
	const { isAuth, user } = useRecoilValue(userAtom);
	const location = useLocation();
	const navigate = useNavigate();

	const handleSearch = (e) => {
		const query = e.target.value.toLowerCase();
		if (query.trim().length > 0 && e.key === 'Enter') {
			navigate(`/search/${query}`);
			setSearchBoxshow((s) => !s);
		}
	};

	useEffect(() => {
		const handleClick = (e) => {
			if (navRef.current && !navRef.current.contains(e.target)) {
				setNavPanel(false);
			}
		};
		// add event listener when navPanel mounts
		document.addEventListener('click', handleClick);

		// remove event listener when navPanel unmounts
		return () => document.removeEventListener('click', handleClick);
	}, [navPanel]);

	return (
		<>
			<nav className="navbar">
				<Link to="/" className="flex-none w-10 md:w-12">
					<img src={logo} alt="logo" className="w-full" />
				</Link>
				<div
					className={
						'absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show ' +
						(searchBoxshow ? 'show' : 'hide')
					}
				>
					<input
						name="search"
						type="text"
						ref={searchRef}
						placeholder="Search"
						className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey placeholder:text-xl md:pl-12"
						onKeyDown={(e) => {
							handleSearch(e);
						}}
					/>
					<i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl"></i>
				</div>
				<div className="flex items-center gap-3 md:gap-6 ml-auto">
					<button
						className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
						onClick={() => {
							setSearchBoxshow((s) => !s);
							searchRef.current.focus();
						}}
					>
						<i className="fi fi-rr-search text-xl pt-1"></i>
					</button>
					<Link to="/editor" className=" hidden md:flex link gap-2 mt-1">
						<i className="fi fi-rr-edit text-2xl"></i>
						<p className="text-2xl">Write</p>
					</Link>
					{isAuth && user ? (
						<>
							<Link to="/dashboard/notification">
								<button className="relative w-12 h-12 rounded-full bg-grey hover:bg-black/10">
									<i className="fi fi-rr-bell text-2xl block mt-1"></i>
								</button>
							</Link>
							<div
								className="relative pt-[.380rem]"
								onClick={() => {
									setNavPanel((s) => !s);
								}}
								onBlur={() => setTimeout(() => setNavPanel(false), 300)}
							>
								<button className="w-12 h-12">
									<img
										src={user?.profile_img}
										className="w-full h-full object-cover rounded-full border border-dark-grey/20"
									/>
								</button>
								{navPanel && <UserNavigationPanel />}
							</div>
						</>
					) : (
						<>
							<Link
								to="/login"
								state={{ from: location }}
								replace
								className="btn-dark"
							>
								Login
							</Link>
							<Link to="/register" className="hidden md:block btn-dark">
								Register
							</Link>
						</>
					)}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
