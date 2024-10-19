"use server"
import { getNewsByIdAsync } from '@/app/_lib/queries/news-queries'
import EditForm from './components/EditForm'

const NewsEditPage = async ({params}: {params: {editid: number}}) => {
    const singleNews = await getNewsByIdAsync(params.editid)

    return (
        <>
            <div className='font-medium text-sm text-gray-500 cursor-pointer'>
                <div>Admin &gt; News &gt; Edit</div>
            </div>
            <div className='w-full flex h-full flex-col border-t-[1px] pt-2'>
                <h2 className='text-3xl font-bold'>Edit News</h2>
                <div className="w-full overflow-clip rounded-md mt-2 p-2 border-[1px] border-gray-800">
                    <EditForm singleNews={singleNews}/>
                </div>
            </div>
        </>
    )
}

export default NewsEditPage
