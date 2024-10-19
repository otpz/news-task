import { revalidatePath } from 'next/cache'
import React from 'react'

const Admin = () => {

  revalidatePath("/admin/", "page")
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
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    Admin Test
                  </th>
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    admintest@gmail.com
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    ADMIN
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    18.10.2024
                  </td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Admin
