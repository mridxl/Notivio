import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../common/states/userAtom';
import { useEffect, useRef, useState } from 'react';

export default function SidebarNav() {
	const page = window.location.pathname.split('/')[2];

	const [pageState, setPageState] = useState(page?.replace(/-/g, ' '));
	const [showSideNav, setShowSideNav] = useState(false);

	const activeTabLine = useRef();
	const sidebarIconTab = useRef();
	const pageStateTab = useRef();

	const changePageState = (e) => {
		const { offsetLeft, offsetWidth } = e.target;
		activeTabLine.current.style.left = `${offsetLeft}px`;
		activeTabLine.current.style.width = `${offsetWidth}px`;

		if (e.target === sidebarIconTab.current) {
			setShowSideNav(true);
		} else {
			setShowSideNav(false);
		}
	};

	useEffect(() => {
		setShowSideNav(false);
		pageStateTab.current.click();
	}, [pageState]);

	return (
		<>
			<section className="relative flex gap-10 py-0 m-0 max-md:flex-col">
				{/* Mobile sidebar + nav */}
				<div className="sticky top-[80px] z-30">
					<div className="md:hidden bg-white py-1 border-b border-grey flx flex-nowrap overflow-x-auto">
						<button
							ref={sidebarIconTab}
							onClick={changePageState}
							className="p-5 capitalize"
						>
							<i className="fi fi-rr-bars-staggered pointer-events-none"></i>
						</button>
						<button
							ref={pageStateTab}
							onClick={changePageState}
							className="p-5 capitalize font-medium"
						>
							{pageState}
						</button>
						<hr
							ref={activeTabLine}
							className="absolute bottom-0 duration-500"
						/>
					</div>

					{/* Sidebar */}
					<div
						className={
							'min-w-[200px] h-[calc(100vh-80px-60px)] md:h-cover md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute max-md:top-[64px] bg-white max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500 ' +
							(showSideNav
								? 'max-md:opacity-100 max-md:pointer-events-auto'
								: 'max-md:opacity-0 max-md:pointer-events-none')
						}
					>
						{/* Dashboard */}
						<h1 className="text-xl text-dark-grey mb-3">Dashboard</h1>
						<hr className="border-grey -ml-6 mb-8 mr-6" />
						<NavLink
							to="/dashboard/blogs"
							onClick={(e) => setPageState(e.target.innerText)}
							className="sidebar-link"
						>
							<i className="mt-1 fi fi-rr-document"></i>
							Blogs
						</NavLink>
						<NavLink
							to="/dashboard/notification"
							onClick={(e) => setPageState(e.target.innerText)}
							className="sidebar-link"
						>
							<i className="mt-1 fi fi-rr-bell"></i>
							Notification
						</NavLink>
						<NavLink
							to="/editor"
							onClick={(e) => setPageState(e.target.innerText)}
							className="sidebar-link"
						>
							<i className="mt-1 fi fi-rr-file-edit"></i>
							Write
						</NavLink>

						{/* Settings */}
						<h1 className="text-xl text-dark-grey mb-3 mt-20">Settings</h1>
						<hr className="border-grey -ml-6 mb-8 mr-6" />
						<NavLink
							to="/settings/edit-profile"
							onClick={(e) => setPageState(e.target.innerText)}
							className="sidebar-link"
						>
							<i className="mt-1 fi fi-rr-user"></i>
							Edit Profile
						</NavLink>
						<NavLink
							to="/settings/change-password"
							onClick={(e) => setPageState(e.target.innerText)}
							className="sidebar-link"
						>
							<i className="mt-1 fi fi-rr-lock"></i>
							Change Password
						</NavLink>
					</div>
				</div>
				<div className="max-md:-mt-8 mt-5 w-full">
					<Outlet />
				</div>
			</section>
		</>
	);
}
