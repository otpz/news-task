import Link from 'next/link'
import React from 'react'

const NewsPage = () => {
  return (
    <>
      <div className='font-medium text-sm text-gray-500 cursor-pointer'>
        Admin &gt; News
      </div>
      <div className='w-full flex h-full flex-col border-t-[1px] pt-2'>
        <div className='flex w-full items-center'>
          <h2 className='text-3xl font-bold'>News</h2>
          <Link href="/admin/news/add" className='ml-6 font-medium p-2 border-[1px] border-black rounded-md'>Add News +</Link>
        </div>
        <div className="w-full overflow-clip rounded-md mt-2">
          <table className="w-full text-sm text-left">
              <thead className="w-full text-xs uppercase bg-gray-700 text-gray-400 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Content
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Expire Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    1
                  </th>
                  <td className="truncate max-w-40 px-6 py-4 font-medium whitespace-nowrap text-white">
                    Example Example Example Example 
                  </td>
                  <td className="truncate max-w-52 px-6 py-4 font-medium whitespace-nowrap text-white">
                    ExampleExampleExampleExampleExampleExampleExampleExample
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    18.10.2024
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    18.10.2025
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap text-white flex">
                    <Link href="/admin/news/1">Edit</Link>
                    <hr className='mx-2 w-[1px] h-[20px] text-white bg-white'/>
                    <Link href="/admin/news/delete">Delete</Link>
                  </td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default NewsPage
