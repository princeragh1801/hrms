
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "./Input";

export interface FieldConfig {
    name: string;
    label: string;
    type: string; // e.g., "text", "checkbox", "radio"
    placeholder?: string; // Optional, not needed for radio
    validation: {
        required: string;
        minLength?: { value: number; message: string };
        min?: { value: number; message: string };
        max?: { value: number; message: string };
    };
    options?: { label: string; value: string | number }[]; // For radio or select inputs
    inputOptions?: { valueAsNumber?: boolean }; // For numeric or checkbox-specific configurations
}

interface DynamicFormProps<T extends FieldValues> {
    fields: FieldConfig[];
    onSubmit: SubmitHandler<T>;
}

function DynamicForm<T extends FieldValues>({ fields, onSubmit }: DynamicFormProps<T>) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<T>();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <Input
                    key={index}
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    register={register(field.name as any, { ...field.validation, valueAsNumber:field.inputOptions?.valueAsNumber })}
                    options={field.options}
                    error={errors[field.name as keyof T]?.message?.toString()}
                />
            ))}
            <div className="flex justify-center my-4">
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg font-semibold bg-green-600 text-white"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default DynamicForm;
