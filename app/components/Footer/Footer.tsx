"use client"
import React from 'react'
import Link from "next/link";

const Footer = () => {
    
    return (
        <footer className='w-full min-h-12 flex px-4 bg-black text-white'>
            <div className="w-full flex justify-between items-center">
                <ul className='font-extralight text-sm max-w-400 flex justify-between items-center gap-6'>
                    <li className=''>    
                        <Link href="/news">News</Link>
                    </li>
                    <li className=''>    
                        <Link href="/announcements">Announcements</Link>
                    </li>
                    <li className=''>
                        <Link href="/signup">Sign Up</Link>
                    </li>
                    <li className=''>
                        <Link href="/signin">Sign In</Link>
                    </li>
                </ul>
                <div className='text-sm text-gray-500'>
                    Developed by <a className="text-gray-400" href="https://linkedin.com/in/otpz">Osman Topuz</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
