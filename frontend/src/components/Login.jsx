// import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";

function Login() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginUser, {isLoading, error}] = useLoginUserMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSubmit = async (data) => {
    // console.log(data)
    try {
      const response = await loginUser(data).unwrap()
      
      const {token, user} = response
      // console.log(response.token)
      alert("Login succesfull")
       dispatch(setUser({user}))
      navigate("/")
    } catch (error) {
      setMessage("Please Provide a valid email and password")
      // console.error("Login Failed:" , error)
    }
  }

  return (
    <section className="h-screen flex items-center justify-center p-2">
      <div className="bg-white p-8 max-w-sm max-auto shadow-md">
        <h2 className=" text-2xl font-semibold pt-5">Please Login</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 max-w-sm mx-auto pt-6"
        >
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {errors.email && (
            <span className="text-red-500 m-1">Email is required</span>
          )}
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
            
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 "
          />
          
          {errors.password && (
            <span className="text-red-500 m-1">Password is required</span>
          )}

          {
            message && <p className="text-red-500" >{message}</p>
          }

          <button className="w-full mt-4 bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-sm">
            Login
          </button>
        </form>

        <div className="my-5 italic text-sm text-center">
          Don't have an account
          <Link
            to="/register"
            className="text-red-700 hover:text-red-500 px-1 cursor-pointer !underline"
          >
            Register
          </Link>
          here.
        </div>
      </div>
    </section>
  );
}

export default Login;
