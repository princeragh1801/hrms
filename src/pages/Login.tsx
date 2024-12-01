import DynamicForm from "../components/shared/DynamicForm";

interface LoginFormValues {
    username: string;
    password: string;
    salary: number
  }
function Login() {

    const fields = [
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
        name: "gender",
        label: "Gender",
        type: "radio",
        validation: { required: "Please select a gender" },
        options: [
            { label: "Male", value: 1 },
            { label: "Female", value: 2 },
            { label: "Other", value: 3 },
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
            { label: "Admin", value: 1 },
            { label: "User", value: 2 },
            { label: "Guest", value: 3 },
        ],
      }
    ];
    
    const handleLoginSubmit = (data: LoginFormValues) => {
        //parseInt(data.salary)
        console.log("Login Form Submitted:", data);
    };
  return (
    <div className="h-screen w-full flex justify-center items-center">
        <div className="border-2 rounded-lg flex items-center justify-center flex-col gap-x-2">
            <h1 className="font-bold text-xl my-4">Login</h1>
            <DynamicForm<LoginFormValues> fields={fields} onSubmit={handleLoginSubmit} />
        </div>
    </div>
  )
}

export default Login