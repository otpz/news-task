"use client"
import { deleteNewsActionAsync } from '@/app/_lib/actions/news-actions';
import React from 'react'
import { useRouter } from 'next/navigation'

const TableRow = ({item} : {item: {
        id: number;
        subject: string;
        content: string;
        expireDate: string;
        createdDate: string;
        updatedDate: Date | null;
        imageId: number | null;
}}) => {
    
    const router = useRouter()

    return (
        <tr className="bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.id}
            </th>
            <td className="truncate max-w-40 px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.subject}
            </td>
            <td className="truncate max-w-52 px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.content}
            </td>
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.expireDate}
            </td>
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.createdDate}
            </td>
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white flex">
                <button onClick={() => router.push(`/admin/news/${item.id}`)}>Edit</button>
                <hr className='mx-2 w-[1px] h-[20px] text-white bg-white'/>
                <button onClick={async () => await deleteNewsActionAsync(item.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default TableRow
