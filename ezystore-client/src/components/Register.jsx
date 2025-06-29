import React, { useRef, useEffect, useState } from "react"; // Added useState
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa"; // Added FaEye and FaEyeSlash
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import PageTitle from "./PageTitle";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const submit = useSubmit();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");

    if (actionData?.success) {
      navigate("/login");
      toast.success("Registration completed successfully. Try login..", {
        position: "top-right",
        autoClose: 3000,
        theme: isDark ? "dark" : "light",
      });
    }
  }, [actionData, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    if (!validatePasswords(formData)) {
      return;
    }
    submit(formData, { method: "post" });
  };

  /**
   * Validate Passwords Match
   */
  const validatePasswords = (formData) => {
    const password = formData.get("password");
    const confirmPwd = formData.get("confirmPwd");

    if (password !== confirmPwd) {
      const isDark = document.documentElement.classList.contains("dark");
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
        theme: isDark ? "dark" : "light",
      });
      return false;
    }
    return true;
  };

  const labelStyle =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const inputWrapperStyle =
    "relative flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 hover:border-gray-400 dark:hover:border-gray-500 focus-within:border-gray-400 dark:focus-within:border-gray-500 transition-all";
  const iconStyle = "text-gray-400 dark:text-gray-500 absolute left-3 text-lg";
  const textFieldStyle =
    "w-full pl-10 py-3 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";
  const errorStyle = "text-red-500 dark:text-red-400 text-xs mt-1";

  return (
    <div className="min-h-screen flex items-center justify-center font-primary bg-gradient-to-br from-[--color-normalbg] to-gray-100 dark:from-[--color-darkbg] dark:to-gray-900 px-4 transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl max-w-2xl w-full px-12 py-16 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all mt-[-90px]">
        <PageTitle title="Create Account" subtitle="Join us today" />

        {/* Form */}
        <Form
          method="POST"
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 mt-10"
        >
          {/* Name Field */}
          <div>
            <label htmlFor="name" className={labelStyle}>
              Full Name
            </label>
            <div className={inputWrapperStyle}>
              <FaUser className={iconStyle} />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                minLength={5}
                maxLength={30}
                className={textFieldStyle}
              />
            </div>
            {actionData?.errors?.name && (
              <p className={errorStyle}>{actionData.errors.name}</p>
            )}
          </div>

          {/* Email and Mobile Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email Address
              </label>
              <div className={inputWrapperStyle}>
                <FaEnvelope className={iconStyle} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  required
                  className={textFieldStyle}
                />
              </div>
              {actionData?.errors?.email && (
                <p className={errorStyle}>{actionData.errors.email}</p>
              )}
            </div>

            {/* Mobile Number Field */}
            <div>
              <label htmlFor="mobileNumber" className={labelStyle}>
                Mobile Number
              </label>
              <div className={inputWrapperStyle}>
                <FaPhone className={iconStyle} />
                <input
                  id="mobileNumber"
                  type="tel"
                  name="mobileNumber"
                  placeholder="1234567890"
                  required
                  pattern="^\d{10}$"
                  title="Mobile number must be exactly 10 digits"
                  className={textFieldStyle}
                />
              </div>
              {actionData?.errors?.mobileNumber && (
                <p className={errorStyle}>{actionData.errors.mobileNumber}</p>
              )}
            </div>
          </div>

          {/* Password Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password Field */}
            <div>
              <label htmlFor="password" className={labelStyle}>
                Password
              </label>
              <div className={inputWrapperStyle}>
                <FaLock className={iconStyle} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  name="password"
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  minLength={8}
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
              {actionData?.errors?.password && (
                <p className={errorStyle}>{actionData.errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPwd" className={labelStyle}>
                Confirm Password
              </label>
              <div className={inputWrapperStyle}>
                <FaLock className={iconStyle} />
                <input
                  id="confirmPwd"
                  type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                  name="confirmPwd"
                  placeholder="••••••••"
                  required
                  autoComplete="confirm-password"
                  minLength={8}
                  maxLength={20}
                  className={textFieldStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms & Submit */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <label className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              />
              <span>
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-primary dark:text-light hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-primary dark:text-light hover:underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center gap-2 px-6 py-3 text-white text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-light dark:to-primary dark:hover:from-primary dark:hover:to-light transition-all whitespace-nowrap"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Form>

        {/* Login Link */}
        <p className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary dark:text-light hover:text-dark dark:hover:text-primary transition-colors hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function registerAction({ request }) {
  const data = await request.formData();
  const registerData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    password: data.get("password"),
  };
  try {
    const response = await apiClient.post("/auth/register", registerData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}