
import Header from "./components/shared/Header";
import Sidebar from "./components/shared/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {

  return (
    <div className="w-full h-full flex">
      <div>
      <Sidebar/>
      </div>
      <div className="flex flex-col w-full">
      <Header/>
    <main className="p-4 w-full h-full">
      <Outlet/>
    </main>
      </div>
  </div>
  )
}

export default Layout
