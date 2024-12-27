import { Link, useLocation, useNavigate } from 'react-router';
import logo from '../assets/logo.png';
import React, { useEffect, useRef, useState } from 'react';
import { NotebookPen, Search, X } from 'lucide-react';

const Navbar = () => {
  const [searchBoxshow, setSearchBoxshow] = useState(false);
  const [navPanel, setNavPanel] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    if (query.trim().length > 0 && e.key === 'Enter') {
      navigate(`/search/${query}`);
      setSearchBoxshow((s) => !s);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="w-10 flex-none md:w-12">
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div
          className={
            'md:show absolute left-0 top-full mt-0.5 w-full border-b border-grey bg-white px-[5vw] py-4 md:relative md:inset-0 md:block md:w-auto md:border-0 md:p-0 ' +
            (searchBoxshow ? 'show' : 'hide')
          }
        >
          <input
            name="search"
            type="text"
            ref={searchRef}
            placeholder="Search"
            className="w-full rounded-full bg-grey p-3 pl-6 pr-[12%] placeholder:text-xl placeholder:text-dark-grey md:w-auto md:pl-14 md:pr-6"
            onKeyDown={(e) => {
              handleSearch(e);
            }}
          />
          <Search className="absolute right-[10%] top-1/2 size-6 -translate-y-1/2 md:pointer-events-none md:left-5" />
        </div>
        <div className="ml-auto flex items-center gap-3 md:gap-6">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-grey md:hidden"
            onClick={() => {
              setSearchBoxshow((s) => !s);
              if (searchRef.current) {
                searchRef.current.focus();
              }
            }}
          >
            {searchBoxshow ? (
              <X className="size-5" />
            ) : (
              <Search className="size-5" />
            )}
          </button>
          <Link
            to="/editor"
            className="link mt-1 hidden items-center gap-2 rounded-xl md:flex"
          >
            <NotebookPen className="size-6" />
            <p className="text-2xl">Write</p>
          </Link>

          <Link to="/login" className="btn-dark">
            Login
          </Link>
          <Link to="/register" className="btn-dark hidden md:block">
            Register
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
