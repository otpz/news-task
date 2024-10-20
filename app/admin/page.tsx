"use server"
import { revalidatePath } from 'next/cache'
import React from 'react'
import { getAllUserAsync } from '../_lib/queries/user-queries'

const Admin = async () => {

  revalidatePath("/admin/", "page")

  const users = await getAllUserAsync()

  return (
    <>
      <div className='font-medium text-sm text-gray-500 cursor-pointer'>
        Admin &gt; Dashboard
      </div>
      <div className='w-full flex h-full flex-col border-t-[1px] pt-2'>
        <h2 className='text-3xl font-bold'>Users</h2>
        <div className="w-full overflow-clip rounded-md mt-2">
          <table className="w-full text-sm text-left">
              <thead className="w-full text-xs uppercase bg-gray-700 text-gray-400 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map(user => (
                  <tr className="bg-gray-800" key={user.id}>
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      {user.id}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      {user.name} {user.surname}
                    </th>
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      {user.createdDate}
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Admin
