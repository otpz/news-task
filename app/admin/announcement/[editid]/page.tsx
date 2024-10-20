"use server"
import { getAnnouncementByIdAsync } from '@/app/_lib/queries/announcement-queries';
import EditForm from './components/EditForm';
        
const AnnouncementEditPage = async ({params}: {params: {editid: number}}) => {
    const singleAnnouncement = await getAnnouncementByIdAsync(params.editid)

    return (
        <>
            <div className='font-medium text-sm text-gray-500 cursor-pointer'>
                Admin &gt; Announcement &gt; Edit
            </div>
            <div className='w-full flex h-full flex-col border-t-[1px] pt-2'>
                <h2 className='text-3xl font-bold'>Edit Announcement</h2>
                <div className="w-full overflow-clip rounded-md mt-2 p-2 border-[1px] border-gray-800">
                    <EditForm singleAnnouncement={singleAnnouncement}/>
                </div>
            </div>
        </>
    )
}

export default AnnouncementEditPage
