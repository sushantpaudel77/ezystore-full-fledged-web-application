import React from "react";
import Header from "./Header";
import Footer from "./footer/Footer";
import PageTitle from "./PageTitle";
import errorImage from "../assets/util/error.png";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const routeError = useRouteError();

  const getErrorMessage = () => {
    if (routeError?.status === 404) {
      return "The page you're looking for seems to have wandered off into the digital void.";
    }
    if (routeError?.status === 500) {
      return "Our servers are taking a coffee break. We'll have them back up shortly.";
    }
    return (
      routeError?.data || "Oops! Something unexpected happened on our end."
    );
  };

  const getErrorTitle = () => {
    if (routeError?.status === 404) {
      return "Page Not Found";
    }
    if (routeError?.status === 500) {
      return "Server Error";
    }
    return `Error ${routeError?.status || "Unknown"}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-primary">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Code */}
          <div className="mb-8">
            <div className="text-6xl md:text-7xl font-bold text-slate-700 dark:text-slate-300">
              {routeError?.status || "?"}
            </div>
          </div>

          {/* Error Title with Animation */}
          <div className="mb-6 transform animate-fade-in-up animation-delay-200">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
              {getErrorTitle()}
            </h1>

            {/* Decorative Line */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent w-32"></div>
              <div className="mx-4 w-2 h-2 bg-gradient-to-r from-red-500 to-purple-600 rounded-full animate-pulse"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent w-32"></div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8 transform animate-fade-in-up animation-delay-400">
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
              {getErrorMessage()}
            </p>
          </div>

          {/* Error Illustration */}
          <div className="mb-10 transform animate-fade-in-up animation-delay-600">
            <img
              src={errorImage}
              alt="Error Illustration"
              className="w-full max-w-sm mx-auto filter drop-shadow-sm hover:drop-shadow-md transition-all duration-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center transform animate-fade-in-up animation-delay-800">
            <Link
              to="/home"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-slate-800 dark:bg-slate-700 text-white shadow-lg hover:shadow-xl hover:bg-slate-700 dark:hover:bg-slate-600 transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back to Home
              </div>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-white/10 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-600 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 group-hover:animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Go Back
              </div>
            </button>
          </div>

          {/* Additional Help Text */}
          <div className="mt-8 transform animate-fade-in-up animation-delay-1000">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              If this problem persists, please{" "}
              <Link
                to="/contact"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline decoration-2 underline-offset-2 hover:decoration-purple-600 dark:hover:decoration-purple-400 transition-colors duration-200"
              >
                contact our support team
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
