import React from "react";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";

export default function Login() {
  const labelStyle =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const inputWrapperStyle =
    "relative flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 hover:border-gray-400 dark:hover:border-gray-500 focus-within:border-gray-400 dark:focus-within:border-gray-500 transition-all";
  const iconStyle = "text-gray-400 dark:text-gray-500 absolute left-3 text-lg";
  const textFieldStyle =
    "w-full pl-10 py-3 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";

  return (
    <div className="min-h-screen flex items-center justify-center font-primary bg-gradient-to-br from-[--color-normalbg] to-gray-100 dark:from-[--color-darkbg] dark:to-gray-900 px-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl max-w-xl w-full px-12 py-16 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all mt-[-90px]">
        <PageTitle title="Welcome back" subtitle="Login to your account" />

        {/* Form */}
        <form className="space-y-6 mt-10">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username or Email
            </label>
            <div className={inputWrapperStyle}>
              <FaUser className={iconStyle} />
              <input
                id="username"
                type="text"
                name="username"
                placeholder="username@example.com"
                required
                className={textFieldStyle}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center">
              <label htmlFor="password" className={labelStyle}>
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-primary dark:text-light hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className={inputWrapperStyle}>
              <FaLock className={iconStyle} />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                minLength={8}
                maxLength={20}
                className={textFieldStyle}
              />
            </div>
          </div>

          {/* Remember Me & Submit */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className="group flex items-center gap-2 px-6 py-3 text-white text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-light dark:to-primary dark:hover:from-primary dark:hover:to-light transition-all"
            >
              Sign in
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary dark:text-light hover:text-dark dark:hover:text-primary transition-colors hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
