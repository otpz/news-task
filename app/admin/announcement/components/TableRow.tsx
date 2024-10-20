"use client"
import { deleteAnnouncementActionAsync } from '@/app/_lib/actions/announcement-actions'
import React from 'react'
import { useRouter } from 'next/navigation'

interface Props {
    item: {
        AnnouncementsImages: {
            id: number;
            createdDate: string;
            updatedDate: Date | null;
            imageName: string;
        } | null;
        Announcements: {
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

    return (
        <tr className="bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.Announcements.id}
            </th>
            <td className="truncate max-w-40 px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.Announcements.subject}
            </td>
            <td className="truncate max-w-52 px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.Announcements.content}
            </td>
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.Announcements.expireDate}
            </td>
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                {item.Announcements.createdDate}
            </td>
            <td className="px-6 py-4 font-medium whitespace-nowrap text-white flex">
                <button onClick={() => router.push(`/admin/announcement/${item.Announcements.id}`)}>Edit</button>
                <hr className='mx-2 w-[1px] h-[20px] text-white bg-white'/>
                <button onClick={async () => await deleteAnnouncementActionAsync(item.Announcements.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default TableRow
