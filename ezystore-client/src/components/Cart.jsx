import React, { useMemo } from "react";
import PageTitle from "./PageTitle";
import { Link, useNavigate } from "react-router-dom";
import emptyCartImage from "../assets/util/emptycart.png";
import { FaArrowLeft } from "react-icons/fa";
import { useCart } from "../store/cart-context";
import CartTable from "./CartTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();

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
              {/* Back to Products Button with signature gradient */}
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg transition-all duration-500 ease-in-out hover:scale-[1.02] active:scale-[0.98] shadow-md
                  bg-[linear-gradient(to_right,var(--color-primary),var(--color-dark))]
                  dark:bg-[linear-gradient(to_right,var(--color-light),var(--color-primary))]
                  hover:bg-[linear-gradient(to_right,var(--color-dark),var(--color-primary))]
                  dark:hover:bg-[linear-gradient(to_right,var(--color-primary),var(--color-light))]"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-xs" />
                Back to Products
              </Link>

              {/* Proceed to Checkout Button (unchanged) */}
              <Link
                to="/checkout"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
              >
                Proceed to Checkout
                <FontAwesomeIcon icon={faCreditCard} className="ml-2 text-xs" />
              </Link>
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
              Oops... Your cart is currently empty. Looks like you haven't added
              anything yet.
            </p>

            {/* CTA Button */}
            <Link
              to="/home"
              className="flex items-center gap-2 px-6 py-3.5 text-white/90 text-lg font-semibold rounded-lg bg-primary dark:bg-gradient-to-r dark:from-light dark:to-primary shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FaArrowLeft /> Back to Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
