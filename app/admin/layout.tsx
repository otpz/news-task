import Sidebar from "./components/Sidebar"

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className='w-full h-full flex flex-1 flex-row rounded-lg relative'>
            <Sidebar/>
            <section className="p-4 w-full max-h-full h-full">
                {children}
            </section>
      </main>
    )
  }
  
  export default layout
  