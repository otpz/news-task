"use server"
import { getAllAnnouncementAsync } from "../_lib/queries/announcement-queries"
import Card from "./components/Card"

const AnnouncementsPage = async () => {

    const announcements = await getAllAnnouncementAsync()

    return (
        <main className="w-full h-full flex-1 flex flex-row flex-wrap rounded-lg relative bg-slate-100 p-3 gap-4">
            {
                announcements?.map(announcement => (
                    <Card item={announcement} key={announcement.Announcements.id}/>
                ))
            }
        </main>
    )
}

export default AnnouncementsPage
