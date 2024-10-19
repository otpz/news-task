  "use server"
  import { getAllNewsAsync } from '@/app/_lib/queries/news-queries'
  import Link from 'next/link'
  import React from 'react'
  import TableRow from './components/TableRow'
import { revalidatePath } from 'next/cache'

  const NewsPage = async () => {

    const news = await getAllNewsAsync()
    revalidatePath("/admin/news/[editid]", "page")
    
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
                  {news?.map((item) => (  
                    <TableRow item={item} key={item.id}/>
                  ))}
                </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }

  export default NewsPage
