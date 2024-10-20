"use client"
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { signupActionAsync } from '@/app/_lib/actions/auth-actions'
import { useRouter } from 'next/navigation'

const SignUpClientComponent = () => {
  const router = useRouter()
  const {toast} = useToast()
  const [state, action, pending] = useFormState(signupActionAsync, undefined)

  useEffect(() => {
    if (state?.message){
      toast({duration:1500, className:"bg-black text-white border-borderColor", title:"Success 🐱‍👤", description:state.message})
      console.log("çalışıyor")
      router.push("/signin")
    } 
    
    if(state?.errors) {
      toast({duration:2500, className:"bg-red-800 text-white border-borderColor", variant:'destructive', title:"Error ❌", description: "An error occured, please check the form"})
    }
  }, [state, toast, router])

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h2 className='text-4xl font-bold'>Sign Up</h2>
      <div className='mt-4 w-100 h-full border-borderColor border-2 rounded-lg flex flex-col justify-center p-6'>
        <form action={action} className='w-full h-full'>
            <div className='mb-3 flex gap-4'>
              <div className="">
                <label htmlFor="name" className="block text-sm font-medium text-gray-500">Name</label>
                <input autoComplete='off' type="name" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required placeholder="Adam" />
              </div>  
              <div className="">
                <label htmlFor="surname" className="block text-sm font-medium text-gray-500">Surname</label>
                <input autoComplete='off' type="surname" id="surname" name="surname" className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required placeholder="Kruge" />
              </div> 
            </div> 
            {state?.errors?.name && <p className='text-sm text-red-500 -mt-2'>{state.errors.name}</p>}
            {state?.errors?.surname && <p className='text-sm text-red-500 -mt-2'>{state.errors.surname}</p>}

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

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-500">Confirm Password</label>
              <input autoComplete='off' type="password" id="confirmPassword" name="confirmPassword" className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required/>
            </div>
            {state?.errors?.confirmPassword && (
              <div>
                <p className='text-sm text-red-500 -mt-2'>Password must:</p>
                <ul className='text-sm text-red-500 -mt-2'>
                  {state.errors.confirmPassword.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <button disabled={pending} className="mb-3 w-full bg-transparent border-borderColor border-[1px] font-bold py-2 px-4 rounded-md home_button text-sm">
              Sign Up 
            </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">Already have an account? <Link href="/signin" className="text-indigo-500 hover:underline">Sign In.</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUpClientComponent
