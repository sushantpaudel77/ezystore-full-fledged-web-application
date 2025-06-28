import React, { useEffect, useRef, useState } from "react";
import PageTitle from "./PageTitle";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa";
import apiClient from "../api/apiClient";

export default function Contact() {
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";
  const [isConfirming, setIsConfirming] = useState(false);

  // Track toast IDs to prevent duplicates
  const toastIds = useRef({
    confirm: null,
    success: null,
    error: null,
  });

  useEffect(() => {
    // Clean up when component unmounts
    return () => {
      if (toastIds.current.confirm) {
        toast.dismiss(toastIds.current.confirm);
      }
    };
  }, []);

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();

      // Dismiss any existing success toasts first
      if (toastIds.current.success) {
        toast.dismiss(toastIds.current.success);
      }

      toastIds.current.success = toast.success(
        "Message sent successfully! We'll contact you soon.",
        {
          position: "top-right",
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
          autoClose: 3000,
        }
      );
    } else if (actionData && !actionData.success) {
      // Dismiss any existing error toasts first
      if (toastIds.current.error) {
        toast.dismiss(toastIds.current.error);
      }

      toastIds.current.error = toast.error(
        actionData.message || "Failed to send message.",
        {
          position: "top-right",
          theme: document.documentElement.classList.contains("dark")
            ? "dark"
            : "light",
          autoClose: 3000,
        }
      );
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prevent multiple confirmation dialogs
    if (isConfirming || isSubmitting) return;

    setIsConfirming(true);

    // Dismiss any existing confirmation toasts
    if (toastIds.current.confirm) {
      toast.dismiss(toastIds.current.confirm);
    }

    toastIds.current.confirm = toast.info(
      ({ closeToast }) => (
        <div>
          <p className="mb-2">Are you sure you want to send this message?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                closeToast();
                setIsConfirming(false);
              }}
              className="px-3 py-1 text-sm bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                closeToast();
                setIsConfirming(false);
                // Submit form after a small delay to ensure toast is fully closed
                setTimeout(() => {
                  const formData = new FormData(formRef.current);
                  submit(formData, { method: "post" });
                }, 200);
              }}
              className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90"
            >
              Okay
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        theme: document.documentElement.classList.contains("dark")
          ? "dark"
          : "light",
        onClose: () => setIsConfirming(false),
      }
    );
  };
  return (
    <div className="max-w-6xl min-h-screen mx-auto px-4 sm:px-6 py-12 font-primary bg-gradient-to-b from-[--color-normalbg] to-white dark:from-[--color-darkbg] dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <PageTitle title="Get in Touch" className="mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? Fill out the form
            below and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <div>
          <Form
            method="POST"
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg dark:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl"
          >
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  required
                  minLength={5}
                  maxLength={30}
                />
                {actionData?.errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {actionData.errors.name}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    required
                  />
                  {actionData?.errors?.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {actionData.errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors" />
                  </div>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    pattern="^\d{10}$"
                    title="10-digit phone number required"
                    placeholder="1234567890"
                    className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    required
                  />
                  {actionData?.errors?.mobileNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {actionData.errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
              >
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <FaCommentDots className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us about your project..."
                  className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                  required
                  minLength={5}
                  maxLength={500}
                />
                {actionData?.errors?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {actionData.errors.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-3 px-6 py-3.5 text-white text-sm font-medium rounded-lg bg-primary dark:bg-gradient-to-r dark:from-light dark:to-primary shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] group"
              >
                {/* Paper plane icon with hover animation */}
                <FaPaperPlane className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:rotate-12" />

                {isSubmitting ? "Sending..." : "Send Message"}

                {/* Spinner when submitting */}
                {isSubmitting && (
                  <svg
                    className="animate-spin -mr-1 ml-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </Form>
        </div>

        {/* Additional Contact Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 dark:bg-light/10 flex items-center justify-center mb-4">
              <FaEnvelope className="h-5 w-5 text-primary dark:text-light" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Email Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              contact@example.com
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 dark:bg-light/10 flex items-center justify-center mb-4">
              <FaPhone className="h-5 w-5 text-primary dark:text-light" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Call Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              +1 (555) 123-4567
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
            <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 dark:bg-light/10 flex items-center justify-center mb-4">
              <FaCommentDots className="h-5 w-5 text-primary dark:text-light" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Live Chat
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function contactAction({ request }) {
  const formData = await request.formData();

  const contactData = {
    name: formData.get("name"),
    email: formData.get("email"),
    mobileNumber: formData.get("mobileNumber"),
    message: formData.get("message"),
  };

  try {
    await apiClient.post("/contacts", contactData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return {
        success: false,
        errors: error.response?.data || {},
      };
    }

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.",
    };
  }
}
