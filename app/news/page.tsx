"use server"
import { getAllNewsAsync } from "../_lib/queries/news-queries"
import Card from "./components/Card"

const NewsPage = async () => {
    const news = await getAllNewsAsync()
    return (
        <main className="w-full h-full flex-1 flex flex-row flex-wrap rounded-lg relative bg-slate-100 p-3 gap-4">
            {
                news?.map(newsItem => (
                    <Card item={newsItem} key={newsItem.News.id}/>
                ))
            }
        </main>
    )
}

export default NewsPage
