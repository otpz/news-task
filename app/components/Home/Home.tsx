"use client"
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <main className="w-full h-full flex-1 flex flex-col rounded-lg items-center relative bg-slate-300">
      <div className='flex flex-col h-full w-150 items-center mt-16'>
        <h1 className="text-4xl font-bold">News Template</h1>
        <div className='flex gap-16 w-full mt-3 justify-center'>
          <Link href="/news" className='cursor-pointer w-36 border-2 border-black h-12 rounded-md flex items-center justify-center'>News</Link>
          <Link href="/announcements" className='cursor-pointer w-36 border-2 border-black h-12 rounded-md flex items-center justify-center'>Announcements</Link>
        </div>
        <h2 className="text-xl font-semibold mt-2">Sign in with Admin Account for Dashboard.</h2>
        <div className='flex gap-3 w-full justify-center'>
          <div className='cursor-pointer w-48 flex flex-col border-2 border-black mt-3 h-24 p-2 rounded-md'>
            <span className='font-bold'>Admin Account</span>
            <p>
              email: admin@test.com
            </p>
            <p>
              password: 123123asd
            </p>
          </div>
          <div className='cursor-pointer w-48 flex flex-col border-2 border-black mt-3 h-24 p-2 rounded-md'>
            <span className='font-bold'>User Account</span>
            <p>
              email: user@test.com
            </p>
            <p>
              password: 123123asd
            </p>
          </div>
        </div>
        <span className='font-bold mt-2'>or</span>
        <Link href="/signup" className='mt-3 w-20 h-10 flex items-center justify-center border-2 border-black rounded-sm'>Sign Up</Link>
      </div>
    </main>
  )
}

export default Home
