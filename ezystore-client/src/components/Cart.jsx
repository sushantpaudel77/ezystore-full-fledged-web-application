import React from "react";
import PageTitle from "./PageTitle";
import { useNavigate } from "react-router-dom";
import emptyCartImage from "../assets/util/emptycart.png";
import { FaArrowLeft } from "react-icons/fa";

export default function Cart() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home", { state: { username: "sushant" } });
  };

  return (
    <div className="min-h-[852px] py-27 bg-[--color-normalbg] dark:bg-[--color-darkbg] font-primary">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <PageTitle title="Your Cart" />

        {/* Empty Cart Message */}
        <div className="mt-10 text-center flex flex-col items-center justify-center">
          <img
            src={emptyCartImage}
            alt="Empty Cart"
            className="max-w-[280px] mb-6 dark:bg-light rounded-md"
          />
          <p className="max-w-[576px] text-base text-gray-600 dark:text-lighter mb-6">
            Oops... Your cart is currently empty. Looks like you haven’t added
            anything yet.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleClick}
            className="flex items-center gap-2 px-6 py-3.5 text-white/90 text-lg font-semibold rounded-lg bg-primary  dark:bg-gradient-to-r dark:from-light dark:to-primary shadow-md hover:shadow-lg transition-all duration-300  hover:scale-[1.02] active:scale-[0.98]  disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <FaArrowLeft /> Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}
