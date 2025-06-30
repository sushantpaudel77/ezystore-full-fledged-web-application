import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import {
  Form,
  useLoaderData,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaCity,
  FaMapMarkerAlt,
  FaGlobe,
  FaSave,
} from "react-icons/fa";
import PageTitle from "./PageTitle";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth-context";

export default function Profile() {
  const initialProfileData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const { logout } = useAuth();

  const [profileData, setProfileData] = useState(() =>
    sanitizeProfile(initialProfileData)
  );

  function sanitizeProfile(data) {
    return {
      name: data.name || "",
      email: data.email || "",
      mobileNumber: data.mobileNumber || "",
      street: data.street || "",
      city: data.city || "",
      state: data.state || "",
      postalCode: data.postalCode || "",
      country: data.country || "",
    };
  }
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");

    if (actionData?.success) {
      if (actionData.profileData.emailUpdated) {
        sessionStorage.setItem("skipRedirectPath", "true");
        logout();
        toast.success(
          "Logged out successfully! Login again with updated email",
          {
            position: "top-right",
            autoClose: 3000,
            theme: isDark ? "dark" : "light",
          }
        );
        navigate("/login");
      } else {
        toast.success("Your Profile details are saved successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: isDark ? "dark" : "light",
        });
        setProfileData(sanitizeProfile(actionData.profileData));
      }
    }
  }, [actionData, navigate, logout]);

  const labelStyle =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const sectionTitleStyle =
    "text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 pb-2 border-b border-gray-200 dark:border-gray-700";
  const inputWrapperStyle =
    "relative flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 hover:border-gray-400 dark:hover:border-gray-500 focus-within:border-gray-400 dark:focus-within:border-gray-500 transition-all";
  const iconStyle = "text-gray-400 dark:text-gray-500 absolute left-3 text-lg";
  const textFieldStyle =
    "w-full pl-10 py-3 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500";
  const errorStyle = "text-red-500 dark:text-red-400 text-xs mt-1";

  return (
<div className="min-h-screen font-primary bg-gradient-to-br ... px-4 py-10 transition-colors">
     <div className="max-w-3xl mx-auto px-3"> {/* Reduced from max-w-4xl to max-w-3xl */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"> {/* Reduced shadow and rounded */}
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700"> {/* Reduced padding */}
            <PageTitle
              title="My Profile"
              subtitle="Manage your personal information"
            />
          </div>

          {/* Form Content */}
          <div className="px-12 py-8">
            <Form method="PUT" className="space-y-8">
              {/* Personal Details Section */}
              <div>
                <h2 className={sectionTitleStyle}>
                  <FaUser className="inline-block mr-2 text-primary dark:text-light" />
                  Personal Details
                </h2>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className={labelStyle}>
                      Full Name
                    </label>
                    <div className={inputWrapperStyle}>
                      <FaUser className={iconStyle} />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        className={textFieldStyle}
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        required
                        minLength={5}
                        maxLength={30}
                      />
                    </div>
                    {actionData?.errors?.name && (
                      <p className={errorStyle}>{actionData.errors.name}</p>
                    )}
                  </div>

                  {/* Email and Mobile Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className={labelStyle}>
                        Email Address
                      </label>
                      <div className={inputWrapperStyle}>
                        <FaEnvelope className={iconStyle} />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@example.com"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className={textFieldStyle}
                          required
                        />
                      </div>
                      {actionData?.errors?.email && (
                        <p className={errorStyle}>{actionData.errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="mobileNumber" className={labelStyle}>
                        Mobile Number
                      </label>
                      <div className={inputWrapperStyle}>
                        <FaPhone className={iconStyle} />
                        <input
                          id="mobileNumber"
                          name="mobileNumber"
                          type="tel"
                          required
                          pattern="^\d{10}$"
                          title="Mobile number must be exactly 10 digits"
                          value={profileData.mobileNumber}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              mobileNumber: e.target.value,
                            }))
                          }
                          placeholder="1234567890"
                          className={textFieldStyle}
                        />
                      </div>
                      {actionData?.errors?.mobileNumber && (
                        <p className={errorStyle}>
                          {actionData.errors.mobileNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Details Section */}
              <div>
                <h2 className={sectionTitleStyle}>
                  <FaHome className="inline-block mr-2 text-primary dark:text-light" />
                  Address Details
                </h2>

                <div className="space-y-6">
                  {/* Street Field */}
                  <div>
                    <label htmlFor="street" className={labelStyle}>
                      Street Address
                    </label>
                    <div className={inputWrapperStyle}>
                      <FaHome className={iconStyle} />
                      <input
                        id="street"
                        name="street"
                        type="text"
                        placeholder="Enter street address"
                        value={profileData.street}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            street: e.target.value,
                          }))
                        }
                        className={textFieldStyle}
                        required
                        minLength={5}
                        maxLength={30}
                      />
                    </div>
                    {actionData?.errors?.street && (
                      <p className={errorStyle}>{actionData.errors.street}</p>
                    )}
                  </div>

                  {/* City and State Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="city" className={labelStyle}>
                        City
                      </label>
                      <div className={inputWrapperStyle}>
                        <FaCity className={iconStyle} />
                        <input
                          id="city"
                          name="city"
                          type="text"
                          placeholder="Enter your city"
                          value={profileData.city}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                          className={textFieldStyle}
                          required
                          minLength={3}
                          maxLength={30}
                        />
                      </div>
                      {actionData?.errors?.city && (
                        <p className={errorStyle}>{actionData.errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="state" className={labelStyle}>
                        State / Province
                      </label>
                      <div className={inputWrapperStyle}>
                        <FaMapMarkerAlt className={iconStyle} />
                        <input
                          id="state"
                          name="state"
                          type="text"
                          required
                          minLength={2}
                          maxLength={30}
                          placeholder="Enter your state"
                          value={profileData.state}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              state: e.target.value,
                            }))
                          }
                          className={textFieldStyle}
                        />
                      </div>
                      {actionData?.errors?.state && (
                        <p className={errorStyle}>{actionData.errors.state}</p>
                      )}
                    </div>
                  </div>

                  {/* Postal Code and Country Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="postalCode" className={labelStyle}>
                        Postal Code
                      </label>
                      <div className={inputWrapperStyle}>
                        <FaMapMarkerAlt className={iconStyle} />
                        <input
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          placeholder="12345"
                          value={profileData.postalCode}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              postalCode: e.target.value,
                            }))
                          }
                          className={textFieldStyle}
                          required
                          pattern="^\d{5}$"
                          title="Postal code must be exactly 5 digits"
                        />
                      </div>
                      {actionData?.errors?.postalCode && (
                        <p className={errorStyle}>
                          {actionData.errors.postalCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="country" className={labelStyle}>
                        Country
                      </label>
                      <div className={inputWrapperStyle}>
                        <FaGlobe className={iconStyle} />
                        <input
                          id="country"
                          name="country"
                          type="text"
                          required
                          minLength={3}
                          maxLength={30}
                          placeholder="Enter your country"
                          value={profileData.country}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              country: e.target.value,
                            }))
                          }
                          className={textFieldStyle}
                        />
                      </div>
                      {actionData?.errors?.country && (
                        <p className={errorStyle}>
                          {actionData.errors.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center gap-2 px-8 py-3 text-white text-sm font-medium rounded-lg bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-light dark:to-primary dark:hover:from-primary dark:hover:to-light transition-all shadow-lg hover:shadow-xl"
                >
                  <FaSave className="transition-transform group-hover:scale-110" />
                  {isSubmitting ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function profileLoader() {
  try {
    const response = await apiClient.get("/profile"); // Axios GET Request
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}

export async function profileAction({ request }) {
  const data = await request.formData();

  const profileData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    street: data.get("street"),
    city: data.get("city"),
    state: data.get("state"),
    postalCode: data.get("postalCode"),
    country: data.get("country"),
  };
  try {
    const response = await apiClient.put("/profile", profileData);
    return { success: true, profileData: response.data };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to save profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}
