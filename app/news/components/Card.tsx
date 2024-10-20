"use client"
import React from 'react'
import DOMPurify from 'dompurify';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


interface Props {
    item: {
        News: {
            content: string;
            id: number;
            createdDate: string;
            updatedDate: Date | null;
            imageId: number | null;
            subject: string;
            expireDate: string;
        };
        NewsImages: {
            id: number;
            imageName: string;
            createdDate: string;
            updatedDate: Date | null;
        } | null;
    }
}

const Card:React.FC<Props> = ({item}) => {

    const sanitizedContent = DOMPurify.sanitize(item.News.content);

    return (
        <div key={item.News.id} className="relative cursor-pointer w-90 h-84 flex flex-col rounded-lg p-6 shadow-secondary-1 bg-gray-600 text-white">
            <img className="object-cover mb-2 w-full h-40" src={`${item.NewsImages?.imageName}`} alt={item.News.subject} />
            <h5 className="mb-2 text-xl font-medium leading-tight line-clamp-2 min-h-12">{item.News.subject}</h5>
            <p id="content" className="text-base text-clip overflow-hidden line-clamp-2" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></p>
            
            <Dialog>
                <DialogTrigger className='absolute bottom-2 right-3 w-20 border-[1px] rounded-md border-gray-400'>Details</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <img className="w-full max-w-80 m-auto" src={`${item.NewsImages?.imageName}`} alt={item.News.subject} />
                        <DialogTitle>{item.News.subject}</DialogTitle>
                        <DialogDescription className='mt-3 max-h-72 overflow-y-auto' dangerouslySetInnerHTML={{ __html: sanitizedContent }}> 
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Card
