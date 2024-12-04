
import { useState } from 'react'
import ConfirmModal from '../components/modal/ConfirmModal'

function Dashboard() {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <div className='h-full'>
      <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
            >
              Show Modal
            </button>
      {showModal && <ConfirmModal
      heading='Confirm Deletion'
      description='Are you sure you want to delete this item? This action cannot be undone.'
      onConfirm={()=>setShowModal(false)}
      setShowModal={setShowModal}
      />}
    </div>
  )
}

export default Dashboard