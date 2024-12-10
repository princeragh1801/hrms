import React from "react";

export interface InputProps {
    value? : any;
    label: string;
    type: string;
    placeholder?: string;
    register: any; // Register from React Hook Form
    error?: string; // For validation error messages
    options?: { name: string; id: string | number }[]; // For radio inputs
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Ensure proper typing for handleChange
}

const Input: React.FC<InputProps> = ({ value, label, type, placeholder, register, error, options, handleChange }) => {
    return (
        <div className="my-3 mx-4 flex flex-col">
            {type === "checkbox" && (
                <div className="flex items-center ">
                    <input
                        defaultValue={value}
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
                                    defaultValue={value}
                                    type="radio"
                                    value={option.id as number}
                                    {...register}
                                    className="mr-2"
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {type === "select" && options && (
                <>
                    <label className="font-semibold text-gray-600">{label}</label>
                    <select
                        value={value}
                        className="bg-gray-100 p-2 w-60 border-2 rounded-lg"
                        {...register} // Register the input for form validation
                        onChange={(e) => {
                            if (handleChange) handleChange(e); // Trigger the handleChange method if it's passed
                        }}
                    >
                        <option key={placeholder} value="">{placeholder}</option>
                        {options.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {type !== "checkbox" && type !== "radio" && type !== "select" && (
                <>
                    <label className="font-semibold text-gray-600">{label}</label>
                    <input
                        defaultValue={value}
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
