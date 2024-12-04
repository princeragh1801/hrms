import { Link } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { FaHome, FaUsers } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { MdCategory } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";

function Sidebar({ children }: any) {
  const [isActive, setIsActive] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const items = [
    { title: "Dashboard", icon: <FaHome />, path: "/" },
    { title: "Employee", icon: <FaUsers />, path: "/employee" },
    { title: "Department", icon: <MdCategory />, path: "/department" },
    { title: "Project", icon: <GrProjects />, path: "/project" },
    { title: "Task", icon: <BiTask />, path: "/task" },
  ];

  return (
    <div className="relative flex">
      {/* Hamburger Menu for Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 text-gray-600 focus:outline-none"
      >
        <HiMenuAlt3 size={28} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-md z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static w-60`}
      >
        <div className="h-10 mt-5 w-full flex items-center justify-center overflow-hidden">
          <img src="hrms-logo.png" height={100} width={150} alt="Logo" />
        </div>
        <div className="py-6 px-4">
          {items.map((item, index) => (
            <Link
              key={item.title}
              onClick={() => setIsActive(index + 1)}
              to={item.path}
              className={`flex gap-x-4 items-center px-4 py-2 hover:shadow-lg hover:bg-green-100 hover:text-green-600 rounded-lg ${
                isActive === index + 1 && "bg-[#0e9f6e] text-white"
              }`}
            >
              {item.icon}
              <span className="font-semibold">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="flex-1 h-screen overflow-y-auto bg-gray-100"
        onClick={() => isOpen && setIsOpen(false)}
      >
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
