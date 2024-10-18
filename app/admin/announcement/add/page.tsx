import { Editor } from 'primereact/editor'
import React from 'react'

const AddAnnouncementPage = () => {
  return (
    <>
        <div className='font-medium text-sm text-gray-500 cursor-pointer'>
            Admin &gt; Announcement &gt; Add
        </div>
        <div className='w-full flex h-full flex-col border-t-[1px] pt-2'>
            <h2 className='text-3xl font-bold'>Add Announcement</h2>
            <div className="w-full overflow-clip rounded-md mt-2 p-2 border-[1px] border-gray-800">
                <form action="" className='w-full h-full'>
                    <div className="mb-3">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-500">Subject</label>
                        <input autoComplete='off' type="text" id="subject" name="subject" className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required placeholder="Forest Fire" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-500">Content</label>
                        <Editor style={{ height: '140px' }} id='content' name='content' className="rounded-xl mt-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expireDate" className="block text-sm font-medium text-gray-500">Expire Date</label>
                        <input autoComplete='off' type="date" id="expireDate" name="expireDate" className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required placeholder="Forest Fire" />
                    </div>
                    <button type='submit' className="mb-3 w-24 bg-black text-white border-borderColor border-[1px] font-bold py-2 px-4 rounded-md text-sm">
                        Add
                    </button>
                </form>
            </div>
        </div>
    </>
  )
}

export default AddAnnouncementPage
