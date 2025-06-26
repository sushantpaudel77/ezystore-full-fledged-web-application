import React from "react";
import Header from "./Header";
import Footer from "./footer/Footer";
import PageTitle from "./PageTitle";
import errorImage from "../assets/util/error.png";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const routeError = useRouteError();

  return (
    <div className="flex flex-col min-h-[980px] bg-[--color-normalbg] dark:bg-[--color-darkbg] font-primary">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-700 dark:text-lighter">
          <PageTitle title={`Error ${routeError?.status || "Unknown"}`} />

          <p className="max-w-[576px] mx-auto px-2 mb-6 leading-7">
            {routeError?.data || "Sorry, something went wrong."}
          </p>

          <img
            src={errorImage}
            alt="Error Illustration"
            className="w-full max-w-[576px] mx-auto mb-8"
          />

          <Link
            to="/home"
className="inline-block py-3.5 px-8 text-white/90 text-xl font-semibold rounded-lg bg-gradient-to-r from-primary to-primary-dark dark:from-light dark:to-primary shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
