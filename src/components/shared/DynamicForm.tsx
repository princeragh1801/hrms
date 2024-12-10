
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "./Input";

export interface FieldConfig {
    value?:any;
    name: string;
    label: string;
    type: string; // e.g., "text", "checkbox", "radio"
    placeholder?: string; // Optional, not needed for radio
    validation?: {
        required: string;
        minLength?: { value: number; message: string };
        min?: { value: number; message: string };
        max?: { value: number; message: string };
    };
    options?: { name: string; id: string | number }[]; // For radio or select inputs
    inputOptions?: { valueAsNumber?: boolean }; // For numeric or checkbox-specific configurations
    handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Ensure proper typing for handleChange
}

interface DynamicFormProps<T extends FieldValues> {
    fields: FieldConfig[];
    onSubmit: SubmitHandler<T>;
    classname?:string
}

function DynamicForm<T extends FieldValues>({ fields, onSubmit, classname }: DynamicFormProps<T>) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<T>();

    return (
        <form className={`w-full ${classname}` }onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <Input
                value={field.value}
                    key={index}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    register={register(field.name as any, { ...field.validation, valueAsNumber:field.inputOptions?.valueAsNumber })}
                    options={field.options}
                    error={errors[field.name as keyof T]?.message?.toString()}
                    handleChange={field.handleChange}
                />
            ))}
            <div className="flex justify-center my-4">
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg font-semibold bg-[#0e9f6e] text-white"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default DynamicForm;
