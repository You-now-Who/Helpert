import React, { useState } from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-container" data-testid="navbar">
  <nav className="bg-white shadow">
    <div className="container mx-auto px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <a className="text-gray-800 text-xl font-bold md:text-2xl hover:text-gray-700" href="/">
            Helpert
          </a>
          <button
            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline-purple ml-4"
            onClick={toggle}
            data-testid="navbar-toggle"
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              <path
                className={isOpen ? 'hidden' : 'block'}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 5h14a1 1 0 110 2H3a1 1 0 110-2z"
              ></path>
              <path
                className={isOpen ? 'block' : 'hidden'}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm-7.293 7.293a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414l-4.293 4.293a1 1 0 01-1.414 0z"
              ></path>
            </svg>
          </button>
        </div>
        <div className={isOpen ? 'flex' : 'hidden md:flex'}>
          <div className="flex flex-col md:flex-row md:mx-6">
            <a
              href="/"
              className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
              testId="navbar-home"
            >
              Home
            </a>
            {user && (
              <>
                <a
                  href="/form/list"
                  className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
                  testId="navbar-csr"
                >
                  Applications
                </a>
                <a
                  href="/ssr"
                  className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
                  testId="navbar-ssr"
                >
                  Server-side rendered page
                </a>
                <a
                  href="/external"
                  className="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
                  testId="navbar-external"
                >
                  External API
                </a>
              </>
            )}
          </div>
          <div className="flex items-center">
            {!isLoading && !user && (
              <a
                href="/api/auth/login"
                className="btn btn-primary text-gray-800 btn-margin"
                tabIndex={0}
                testId="navbar-login-desktop"
                colo
              >
                Log in
              </a>
            )}
            {user && (
              <div className="relative">
                <button
                  className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                  data-testid="navbar-menu-desktop"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.picture}
                    onClick={toggle}
                    alt="Profile"
                    data-testid="navbar-picture-desktop"
                  />
                </button>
                { isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                  aria-labelledby="user-menu"
                  role="menu"
                >
                  <div className="py-1 rounded-md bg-white shadow-xs">
                    <div className="block px-4 py-2 text-xs text-gray-400">
                      {user.name}
                    </div>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      testId="navbar-profile-desktop"
                    >
                      Profile
                    </a>
                    <a
                      href="/api/auth/logout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      testId="navbar-logout-desktop"
                    >
                      Log out
                    </a>
                  </div>
                </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>
  );
};

export default NavBar;
