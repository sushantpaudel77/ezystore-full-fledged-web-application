import React, { useMemo } from "react";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import emptyCartImage from "../assets/util/emptycart.png";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../store/cart-context";
import CartTable from "./CartTable";

export default function Cart() {
  const { cart } = useCart();

  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  return (
    <div className="min-h-[852px] py-27 bg-[--color-normalbg] dark:bg-[--color-darkbg] font-primary">
      <div className="max-w-4xl mx-auto px-4">
        {/* Title */}
        <PageTitle title="Your Cart" />
        {!isCartEmpty ? (
          <>
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              {/* Back to Products Button */}
              <Link
                to="/"
                className="relative z-0 py-2 px-6 rounded-lg text-white text-xl font-semibold flex justify-center items-center 
      bg-gradient-to-r from-primary to-primary-dark 
      dark:from-light dark:to-primary 
      hover:from-primary-dark hover:to-primary 
      dark:hover:from-primary dark:hover:to-light 
      transition-all duration-500 ease-in-out hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                Back to Products
              </Link>

              {/* Proceed to Checkout Button */}
              <button
                className="relative z-0 py-2 px-6 rounded-lg text-white text-xl font-semibold flex justify-center items-center 
      bg-gradient-to-r from-primary to-primary-dark 
      dark:from-light dark:to-primary 
      hover:from-primary-dark hover:to-primary 
      dark:hover:from-primary dark:hover:to-light 
      transition-all duration-500 ease-in-out hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
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
            <Link
              to="/home"
              onClick={handleClick}
              className="flex items-center gap-2 px-6 py-3.5 text-white/90 text-lg font-semibold rounded-lg bg-primary  dark:bg-gradient-to-r dark:from-light dark:to-primary shadow-md hover:shadow-lg transition-all duration-300  hover:scale-[1.02] active:scale-[0.98]  disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaArrowLeft /> Back to Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
