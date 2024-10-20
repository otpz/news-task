"use server"
import AddForm from './components/AddForm'

const AddAnnouncementPage = () => {
  return (
    <>
        <div className='font-medium text-sm text-gray-500 cursor-pointer'>
            Admin &gt; Announcement &gt; Add
        </div>
        <div className='w-full flex h-full flex-col border-t-[1px] pt-2'>
            <h2 className='text-3xl font-bold'>Add Announcement</h2>
            <div className="w-full overflow-clip rounded-md mt-2 p-2 border-[1px] border-gray-800">
                <AddForm/>
            </div>
        </div>
    </>
  )
}

export default AddAnnouncementPage
