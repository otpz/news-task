"use client"
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { signinActionAsync } from '@/app/_lib/actions/auth-actions'
import { getSession } from '@/app/_lib/session'

const SignInClientComponent = () => {
  const router = useRouter()
  const {toast} = useToast()
  const [state, action, pending] = useFormState(signinActionAsync, undefined)

  useEffect(() => {
    
    const getSessionAndRedirectAsync = async () => {
      const session = await getSession()
      console.log(session)
      if (!session) return
      if (session.roleId === 1) {
        console.log("admin")
        router.push(`/admin`)
        return
      }
      router.push(`/`)
    }

    if (state?.message){
      toast({duration:1500, className:"bg-black text-white border-borderColor", title:"Success 🐱‍👤", description:state.message})
      getSessionAndRedirectAsync()
    }

    if (state?.errors){
      toast({duration:2500, className:"bg-red-800 text-white border-borderColor", variant:'destructive', title:"Error ❌", description: "An error occured, please check the form"})
    }

  }, [state, toast, router])

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h2 className='text-4xl font-bold'>Sign In</h2>
      <div className='mt-4 w-100 border-borderColor border-2 rounded-lg flex flex-col justify-center p-6'>
        <form action={action} className='w-full h-full'>
            <div className="mb-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-500">Email</label>
              <input autoComplete='off' type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required placeholder="adam@gmail.com" />
            </div>
            {state?.errors?.email && <p className='text-sm text-red-500 -mt-2'>{state.errors.email}</p>}
            <div className="mb-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-500">Password</label>
              <input autoComplete='off' type="password" id="password" name="password" className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required/>
            </div>
            {state?.errors?.password && (
              <div>
                <p className='text-sm text-red-500 -mt-2'>Password must:</p>
                <ul className='text-sm text-red-500 -mt-2'>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
            <button type='submit' disabled={pending} className="mb-3 w-full bg-transparent border-borderColor border-[1px] font-bold py-2 px-4 rounded-md home_button text-sm">
              Sign In
            </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Dont have an account? <Link href="/signup" className="text-indigo-500 hover:underline">Sign Up.</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignInClientComponent
