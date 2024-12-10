import DynamicForm, { FieldConfig } from "../components/shared/DynamicForm";

interface LoginFormValues {
    username: string;
    password: string;
    salary: number
  }
function Login() {

    const fields : FieldConfig[] = [
        {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "Enter your username",
            validation: { required: "Username is required" },
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
            validation: {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
            },
        },
        {
          name: "salary",
          label: "Salary",
          type: "number",
          placeholder: "Enter your salary",
          validation: {
              required: "Salary is required",
              min: { value: 1000, message: "Salary must be greater than 1000" }, // Minimum value validation
          },
          inputOptions: { valueAsNumber: true }, // Converts input to number
    
      },
      {
        name: "terms",
        label: "Terms & Condition",
        type: "checkbox",
        validation: {
            required: "You must accept the terms and conditions",
        },
      },
      {
        name: "agree-and-continue",
        label: "Agree & Continue",
        type: "checkbox",
        validation: {
            required: "You must accept the terms and conditions",
        },
      },
      {
        name: "gender",
        label: "Gender",
        type: "radio",
        validation: { required: "Please select a gender" },
        options: [
            { name: "Male", id: 1 },
            { name: "Female", id: 2 },
            { name: "Other", id: 3 },
        ],
        inputOptions: { valueAsNumber: true },
      },
      {
        name: "role",
        label: "Role",
        type: "select",
        placeholder:"Select a role",
        validation: {
            required: "Role is required",
            min:{value:1, message:"Please select a valid role"},
            max:{value:3, message:"Please select a valid role"}
        },
        inputOptions: { valueAsNumber: true },
        options: [
            { name: "Admin", id: 1 },
            { name: "User", id: 2 },
            { name: "Guest", id: 3 },
        ],
      },
      {
        name: "type",
        label: "Type",
        type: "select",
        placeholder:"Select a type",
        validation: {
            required: "Type is required",
            min:{value:1, message:"Please select a valid type"},
            max:{value:3, message:"Please select a valid type"}
        },
        inputOptions: { valueAsNumber: true },
        options: [
            { name: "Admin", id: 1 },
            { name: "User", id: 2 },
            { name: "Guest", id: 3 },
        ],
      }
    ];
    
    const handleLoginSubmit = (data: LoginFormValues) => {
        //parseInt(data.salary)
        console.log("Login Form Submitted:", data);
    };
  return (
    <div className="h-full w-full flex justify-center items-center">
        <div className="border-2 rounded-lg flex items-center justify-center flex-col gap-x-2">
            <h1 className="font-bold text-xl my-4">Login</h1>
            <DynamicForm<LoginFormValues> fields={fields} onSubmit={handleLoginSubmit} />
        </div>
    </div>
  )
}

export default Login