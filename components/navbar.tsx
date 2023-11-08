'use client';

import { SignInButton, UserButton, useAuth } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';
import { useState } from 'react';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

import { Button } from './ui/button';
import { isAdmin } from '@/lib/admin';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { userId } = useAuth();
  const [open, setOpen] = useState(true);

  return (
    <header className="flex flex-col md:items-center md:justify-between md:flex-row relative z-50 mb-8">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-x-2">
          <picture>
            <img
              src="/divisi-humas-polri.png"
              alt="logo"
              className="h-10 mr-3"
            />
          </picture>
          <Link
            href="/"
            className="hidden sm:inline text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
          >
            HUMAS POLRESTA JAYAPURA
          </Link>
        </div>

        <div className="flex items-center gap-x-4  md:hidden">
          <UserButton afterSignOutUrl="/" />

          <button
            className="rounded-lg focus:outline-none focus:shadow-outline"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <Cross1Icon className="w-6 h-6" />
            ) : (
              <HamburgerMenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <nav
        className={cn(
          'flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row',
          open ? 'flex' : 'hidden'
        )}
      >
        <Link
          href="/"
          className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        >
          Home
        </Link>
        <Link
          href="/blog"
          className="px-4 py-2 mt-2 mr-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        >
          Blog
        </Link>
        {isAdmin(userId) && (
          <>
            <Link
              href="/create"
              className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            >
              Create
            </Link>
            <Link
              href="/archive"
              className="px-4 py-2 mt-2 mr-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            >
              Archive
            </Link>
          </>
        )}
        {!isAuthenticated && !isLoading && (
          <SignInButton mode="modal">
            <Button
              variant="ghost"
              className="px-4 py-2 mt-2 mr-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            >
              Login
            </Button>
          </SignInButton>
        )}
      </nav>

      <button className="hidden md:inline-block">
        <UserButton afterSignOutUrl="/" />
      </button>
    </header>
  );
};

export default Navbar;
