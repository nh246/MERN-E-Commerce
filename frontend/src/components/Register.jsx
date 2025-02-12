import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { useState } from "react";

function Register() {
    const [message, setMessage] = useState("");

    const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [registerUser, {isLoading}] = useRegisterUserMutation()

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap()
      alert("registration succesfull")
      navigate("/login")
    } catch (error) {
      setMessage("registration failed!")
    }
  };

  return (
    <section className="h-screen flex items-center justify-center p-2">
      <div className="bg-white p-8 max-w-sm max-auto shadow-md">
        <h2 className=" text-2xl font-semibold pt-5">Please Register</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 max-w-sm mx-auto pt-6"
        >
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="Username"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {errors.username && (
            <span className="text-red-500 m-1 text-sm">Username is required</span>
          )}

          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {errors.email && (
            <span className="text-red-500 m-1 text-sm">Email is required</span>
          )}
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 "
          />

          {errors.password && (
            <span className="text-red-500 m-1 text-sm">Password is required</span>
          )}
             
             {
            message && <p className="text-red-500" >Your given info is not valid</p>
          }

          <button className="w-full mt-4 bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-sm">
            Register
          </button>
        </form>

        <div className="my-5 italic text-sm text-center">
          Have an account? Please
          <Link
            to="/login"
            className="text-red-700 hover:text-red-500 px-1 cursor-pointer !underline"
          >
            Login
          </Link>
          here.
        </div>
      </div>
    </section>
  );
}

export default Register;
