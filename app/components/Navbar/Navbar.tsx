"use client"
import React from 'react'
import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { usePathname } from 'next/navigation'

const Navbar = () => {

    const pathname = usePathname()

    const activeLink = (nav: string) => {
        if (pathname === nav) {
            return "text-white"
        } else {
            return "text-gray-300"
        }
    }

    return (
        <nav className='text-white w-full min-h-16 flex items-center px-4 justify-between bg-black'>
            <Link href="/">
                <h1 className='text-xl font-bold select-none flex items-center'>
                    <span className='ml-1'>DerNex</span>
                </h1>
            </Link>
            <ul className='max-w-400 flex justify-between items-center gap-6'>
                <li className='mt-[2px]'>    
                    <Link className={activeLink("/")} href="/">News</Link>
                </li>
                
                {(!pathname.includes("/profile")) && 
                    <>
                        <li className=''>
                            <Link className={activeLink("/signup")} href="/signup">Sign Up</Link>
                        </li>
                        <li className=''>
                            <Link className={activeLink("/signin")} href="/signin">Sign In</Link>
                        </li>
                    </>
                }

                {/* {user && <span className='h-7 w-[0.5px] bg-borderColor'/>}
                {user && 
                <Menu as="div" className="relative inline-block text-left ">
                        <div>
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-1 font-normal text-white shadow-sm data-[open]:ring-1">
                                {user.name} {user.surname} 
                                <CiCircleChevDown className="mt-[2px] -mr-1 h-5 w-5 text-white"/>
                            </MenuButton>
                        </div>

                        <MenuItems transition className="absolute bg-black right-0 z-10 mt-3 w-40 origin-top-right rounded-md border-borderColor border-2 text-white shadow-lg transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                            <div>
                                <MenuItem>
                                    <Link href={`/profile/${user.id}`} className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-800">
                                        Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link href={`/profile/${user.id}/settings`} className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-800">
                                        Settings
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <button onClick={async () => {await logoutUserAsync()}} className="block w-full px-4 py-2 text-left text-sm text-white data-[focus]:bg-gray-800">
                                        Sign out
                                    </button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                } */}
            </ul>
        </nav>
    ) 
}

export default Navbar
