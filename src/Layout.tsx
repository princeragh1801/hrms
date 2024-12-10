import Header from "./components/shared/Header";
import Sidebar from "./components/shared/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      {/* <div className="flex flex-col flex-1"> */}
        {/* Header */}
        {/* <Header /> */}

        {/* Outlet for Nested Routes */}
        <main className="p-4 flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      {/* </div> */}
    </div>
  );
}

export default Layout;
