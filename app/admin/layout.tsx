"use server"
import { redirect } from "next/navigation"
import { isAdmin } from "../_lib/dal"
import Sidebar from "./components/Sidebar"

const layout = async ({children}: {children: React.ReactNode}) => {

    const admin = await isAdmin()
    if (!admin) {
        redirect('/signin')
    }

    return (
        <main className='w-full h-full flex flex-1 flex-row rounded-lg relative'>
            <Sidebar/>
            <section className="p-4 w-full max-h-full h-full">
                {children}
            </section>
      </main>
    )
  }
  
  export default layout
  