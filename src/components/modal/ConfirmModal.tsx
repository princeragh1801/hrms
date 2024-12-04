import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";

export interface ConfirmModalProps{
    heading:string,
    description:string,
    onConfirm:()=>void,
    setShowModal : Dispatch<SetStateAction<boolean>>
}

function ConfirmModal({heading, description, onConfirm, setShowModal}:ConfirmModalProps) {

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md">
          {/* Header */}
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">{heading}</h3>
            <MdClose className="hover:bg-gray-100 hover:text-green-500" cursor={"pointer"} onClick={() => setShowModal(false)} />
          </div>
  
          {/* Body */}
          <div className="px-6 py-4">
            <p className="text-gray-600">{description}</p>
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
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ConfirmModal;
  