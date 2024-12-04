import { FaUser } from "react-icons/fa"


function Header() {
  return (
    <div className='flex items-center justify-end h-20 shadow-md px-6'>
        <div className="rounded-2xl bg-[#0e9f6e] text-white p-4">
        <FaUser />
        </div>
    </div>
  )
}

export default Header