import React from "react";

export interface InputProps {
    label: string;
    type: string;
    placeholder?: string;
    register: any; // Register from React Hook Form
    error?: string; // For validation error messages
    options?: { label: string; value: string | number }[]; // For radio inputs
}

const Input: React.FC<InputProps> = ({ label, type, placeholder, register, error, options }) => {
    return (
        <div className="my-3 mx-4 flex flex-col">
            {type === "checkbox" && (
                <div className="flex items-center ">
                    <input
                        type="checkbox"
                        {...register}
                        className="mr-2"
                    />
                    <label className="font-semibold text-gray-600">{label}</label>
                </div>
            )}

            {type === "radio" && options && (
                <div>
                    <label className="font-semibold text-gray-600">{label}</label>
                    <div className="flex flex-row gap-4 mt-2">
                        {options.map((option, index) => (
                            <label key={index} className="flex items-center">
                                <input
                                    type="radio"
                                    value={option.value as number}
                                    {...register}
                                    className="mr-2"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
            )}
            {type === "select" && options && (
                <>
                    <label className="font-semibold text-gray-600">{label}</label>
                    <select
                        className="bg-gray-100 p-2 w-60 border-2 rounded-lg"
                        {...register} // register the input for form validation
                    >
                        <option key={placeholder} value={0}>{placeholder}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {type !== "checkbox" && type !== "radio" && type !== "select" && (
                <>
                    <label className="font-semibold text-gray-600">{label}</label>
                    <input
                        className="bg-gray-100 p-2 w-60 border-2 rounded-lg"
                        placeholder={placeholder}
                        type={type}
                        {...register}
                    />
                </>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default Input;
