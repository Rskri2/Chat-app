import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
export default function Header() {
  const [isLoggedIn,setIsLogedIn] = useState(false);
  useEffect(()=>{
    if(window.localStorage.getItem("token")){
      setIsLogedIn(true);
    }
  },[])
  return (
    <header className="sticky top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
           <div className="flex flex-1 items-center">
           <Link
                to="/"
              >
                Home
              </Link>
            
           </div>
          <ul className="flex flex-1 items-center justify-end gap-3 h-full text-xl">
            {
              !isLoggedIn && (
            <li>
              <Link
                to="/login"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all bg-white text-gray-800 shadow hover:bg-gray-50 h-10 w-20"
              >
                Login
              </Link>
            </li>

              )
            }
            {
              !isLoggedIn && (
            <li>
              <Link
                to="/register"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all bg-gray-800 text-gray-200 shadow hover:bg-gray-900 h-10 w-20"
              >
                Register
              </Link>
            </li>

              )
            }
              {
                isLoggedIn && (
                  <li>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem>
                        <button  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full">
                      <Link
                to="/account-info"
                className=""
              >
                          Your Profile
              </Link>
                        </button>
                
                      </MenuItem>
                    </MenuItems>
                  </Menu>
           
                  </li>
                 )
              } 
          </ul>
        </div>
      </div>
    </header>
  )
}
