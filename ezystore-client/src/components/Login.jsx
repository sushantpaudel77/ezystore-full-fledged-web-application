import React, { useEffect, useState } from "react"; // Added useState
import PageTitle from "./PageTitle";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa"; // Added FaEye and FaEyeSlash
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth-context";

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false); // State for show password toggle

  const { loginSuccess } = useAuth();

  const from = sessionStorage.getItem("redirectPath") || "/home";

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");

    if (actionData?.success) {
      loginSuccess(actionData.jwtToken, actionData.user);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        theme: isDark ? "dark" : "light",
      });
      sessionStorage.removeItem("redirectPath");
      setTimeout(() => {
        navigate(from);
      }, 100);
    } else if (actionData?.errors?.message) {
      toast.error(actionData.errors.message, {
        position: "top-right",
        autoClose: 3000,
        theme: isDark ? "dark" : "light",
      });
    }
  }, [actionData, navigate]);

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
        <Form method="POST" className="space-y-6 mt-10">
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
                autoComplete="username"
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
                type={showPassword ? "text" : "password"} // Toggle between text and password
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                minLength={4}
                maxLength={20}
                className={textFieldStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
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
              disabled={isSubmitting}
              className="group flex items-center gap-2 px-6 py-3 text-white text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-light dark:to-primary dark:hover:from-primary dark:hover:to-light transition-all"
            >
              {isSubmitting ? "Authenticating..." : "Login"}
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Form>

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

export async function loginAction({ request }) {
  const data = await request.formData();

  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    const response = await apiClient.post("/auth/login", loginData);
    const { message, user, jwtToken } = response.data;
    return { success: true, message, user, jwtToken };
  } catch (error) {
    return {
      success: false,
      errors: {
        message:
          error.response?.data?.message || "Invalid username or password",
      },
    };
  }
}
