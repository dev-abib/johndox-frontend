"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Container from "@/Components/Common/Container";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
  };

  return (
    <Container>
      <div className="flex h-screen items-center justify-center gap-10 py-10">
        <div className="hidden lg:flex xl:w-[65%] lg:w-[50%] items-center justify-center h-full">
          <img
            src="https://i.ibb.co.com/7dPT0LX2/30ad3fc61803922fec84f5a2798ab18904d9635f.jpg"
            alt="Login Visual"
            className="rounded-2xl w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full xl:w-[35%] lg:w-[50%] flex items-center justify-center px-6">
          <div className="w-full ">
            <h1 className="Auth_section_title mb-2 xl:text-[36px] text-[28px]">
              Welcome Back to Terralink!
            </h1>
            <p className="text-[#404040] mb-8">Sign in your account</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-lg text-[#5F5F5F] mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-lg text-[#5F5F5F]  mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters required",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="accent-primary-blue"
                    {...register("remember")}
                  />
                  Remember Me
                </label>

                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-primary-blue"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-primary-blue text-white py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer"
              >
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-400">Or</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Google Login */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-[#E6F3FF] hover:bg-blue-100 transition cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-[#5F5F5F] text-xl font-medium  ">
                  Sign in with Google
                </span>
              </button>

              {/* Register */}
              <p className="text-center text-gray-500">
                Don’t have any account?{" "}
                <a
                  href="#"
                  className="text-primary-blue font-medium hover:underline"
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
