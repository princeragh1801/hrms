import { Dispatch, SetStateAction, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { addDepartment } from '../services/department'
import { Response } from '../interfaces/shared'

interface AddDepartmentProps{
    setShowModal : Dispatch<SetStateAction<boolean>>
}
function AddDepartment({setShowModal} : AddDepartmentProps) {
    const [name, setName] = useState('')
    const [progress, setProgress] = useState(false)
    const [error, setError] = useState('')
    const handleSubmit = async() => {
        try {
            setProgress(true)
            const response = await addDepartment(name);
            if(response.status >= 200 && response.status < 300){
                const responseData : Response<number> = response.data;
                if(responseData.success){
                    setShowModal(false)
                }
            }
            console.log("Response : ",response)
        } catch (error) {
            console.error("Error occured while adding new department, ", error)
        }finally{
            setProgress(false)
        }
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md">
              {/* Header */}
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Add Department</h3>
                <MdClose className="hover:bg-gray-100 hover:text-green-500" cursor={"pointer"} onClick={() => setShowModal(false)} />
              </div>
      
              {/* Body */}
              <div className="px-6 py-4">
              <div className="my-3 mx-4 flex flex-col">
                <label htmlFor="name" className='font-semibold text-gray-600'>Name:</label>
                <input className='bg-gray-100 p-2 w-60 border-2 rounded-lg' placeholder='Enter name' value={name} onChange={(e)=>{
                    if(e.target.value.trim().length > 2){
                        setError('')
                    }else{
                        setError('Name is required and contains more than 2 characters')
                    }
                    setName(e.target.value)
                }} />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
      
              {/* Footer */}
              <div className="px-6 py-4 border-t flex justify-end gap-4">
                <button
                  onClick={()=>setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Close
                </button>
                <button
                onClick={handleSubmit}
                  disabled={progress}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg transition"
                >
                  {progress ? "Saving..." : "+ Add"}
                </button>
              </div>
            </div>
          </div>
  )
}

export default AddDepartment