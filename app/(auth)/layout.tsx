
const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='w-300 h-full flex flex-1 flex-row rounded-lg px-4 justify-center items-center relative'>
      {children}
    </main>
  )
}

export default layout
