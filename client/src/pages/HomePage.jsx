import Sidebar from "../components/Sidebar"

const HomePage = () => {
  return (
    <div className="h-screen flex items-center">
      <Sidebar />
      <div className="w-full h-full bg-[#323131] flex">
        <div className="box w-full md:max-w-sm border-r-2 border-slate-600"></div>
        <div className="hidden md:flex box w-full"></div>
      </div>
    </div>
  )
}

export default HomePage