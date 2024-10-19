"use client"
import { deleteNewsActionAsync } from '@/app/_lib/actions/news-actions';
import React from 'react'
import { useRouter } from 'next/navigation'

interface Props {
    item: {
        NewsImages: {
            id: number;
            createdDate: string;
            updatedDate: Date | null;
            imageName: string;
        } | null;
        News: {
            id: number;
            createdDate: string;
            updatedDate: Date | null;
            subject: string;
            content: string;
            expireDate: string;
            imageId: number | null;
        };
    }
}

const TableRow:React.FC<Props> = ({item}) => {
    
    const router = useRouter()

    console.log(item)

    return (
        <tr className="bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.News.id}
            </th>
            <td className="truncate max-w-40 px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.News.subject}
            </td>
            <td className="truncate max-w-52 px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.News.content}
            </td>
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.News.expireDate}
            </td>
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.News.createdDate}
            </td>
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white flex">
                <button onClick={() => router.push(`/admin/news/${item.News.id}`)}>Edit</button>
                <hr className='mx-2 w-[1px] h-[20px] text-white bg-white'/>
                <button onClick={async () => await deleteNewsActionAsync(item.News.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default TableRow
