"use client"
import { updateAnnouncementActionAsync } from '@/app/_lib/actions/announcement-actions';
import { useToast } from '@/hooks/use-toast';
import { Editor } from 'primereact/editor'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom';
import Image from 'next/image'

interface Props {
    singleAnnouncement: {
        AnnouncementsImages: {
            id: number;
            createdDate: string;
            updatedDate: Date | null;
            imageName: string;
        } | null;
        Announcements: {
            id: number;
            content: string;
            subject: string;
            expireDate: string;
            imageId: number | null;
            createdDate: string;
            updatedDate: Date | null;
        };
    } | null
}

const EditForm: React.FC<Props> = ({singleAnnouncement}) => {
    const {toast} = useToast()
    const [subject, setSubject] = useState(singleAnnouncement?.Announcements.subject)
    const [content, setContent] = useState<string | null>(singleAnnouncement?.Announcements.content ?? '')
    const [expireDate, setExpireDate] = useState(singleAnnouncement?.Announcements.expireDate)
    const [, setImageFile] = useState<FileList | null>(null)

    const [state, action] = useFormState(updateAnnouncementActionAsync, undefined)

    useEffect(() => {
        if (state?.message){
            toast({duration:800, className:"bg-black text-white border-borderColor", title:"Success 🐱‍👤", description:state.message})
        } 
        if(state?.errorMessage) {
            toast({duration:800, className:"bg-red-800 text-white border-borderColor", variant:'destructive', title:"Error ❌", description: state.errorMessage})
        }
        if (state?.errors){
            console.log(state.errors)
            toast({duration:800, className:"bg-red-800 text-white border-borderColor", variant:'destructive', title:"Error ❌", description: "Form validation error, please check the form"})
        }
    }, [state, toast])

    return (
        <form action={action} className='w-full h-full'>
            <input type="hidden" id='id' name='id' value={singleAnnouncement?.Announcements.id}/>
            <input type="hidden" id="imageId" name='imageId' value={singleAnnouncement?.AnnouncementsImages?.id} />
            <div className="mb-1">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-500">Subject</label>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} autoComplete='off' type="text" id="subject" name="subject" className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required placeholder="Forest Fire" />
            </div>
            {state?.errors?.subject && <div className='text-red-500 text-sm'>{state.errors.subject}</div>}
            <div className="mb-1">
                <label htmlFor="content" className="block text-sm font-medium text-gray-500">Content</label>
                <Editor value={content ?? ''} onTextChange={(e) => setContent(e.htmlValue)} style={{ height: '140px' }} id='content' name='content' className="rounded-xl mt-1 block w-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required/>
                <input type="hidden" name="content" id="content" value={content ?? ''}/>
            </div>
            {state?.errors?.content && <div className='text-red-500 text-sm'>{state.errors.content}</div>}
            <div className="mb-1">
                <label htmlFor="expireDate" className="block text-sm font-medium text-gray-500">Expire Date</label>
                <input value={expireDate} onChange={(e) => setExpireDate(e.target.value)} autoComplete='off' type="date" id="expireDate" name="expireDate" className="mt-1 block w-64 px-3 py-2 border border-borderColor rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" required placeholder="Forest Fire" />
            </div>
            {state?.errors?.expireDate && <div className='text-red-500 text-sm'>{state.errors.expireDate}</div>}
            <div className='mb-1 flex'>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-500">Announcement Image</label>
                    <input onChange={(e) => setImageFile(e.target.files)} type="file" accept="image/*" id="image" name="image" className="mt-1 block w-64 px-3 py-2 border border-borderColor rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[rgb(98,162,255)] sm:text-sm" />
                </div>
                {singleAnnouncement?.AnnouncementsImages && <Image className='ml-10' priority width={80} height={80} src={singleAnnouncement?.AnnouncementsImages?.imageName} alt=''></Image>}
            </div>
            <button type='submit' className="mb-1 w-24 bg-black text-white border-borderColor border-[1px] font-bold py-2 px-4 rounded-md text-sm">
                Save
            </button>
        </form>
    )
}

export default EditForm
