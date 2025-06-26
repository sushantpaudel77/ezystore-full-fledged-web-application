import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  faArrowLeft,
  faShoppingCart,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";

export default function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const zoomRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");

  // Detect dark mode from document element
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setBackgroundPosition("center");
  };

  const handleViewCart = () => navigate("/cart");

  // Button styles based on theme
  const primaryButtonClasses = `
    w-full flex justify-center items-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-lg
    shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-300 relative overflow-hidden group
    ${
      isDark
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
    }
  `;

  const secondaryButtonClasses = `
    w-full flex justify-center items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg
    border-2 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-300 relative overflow-hidden group
    ${
      isDark
        ? "text-indigo-300 border-indigo-400 bg-gray-800 hover:bg-gray-700"
        : "text-indigo-700 border-indigo-300 bg-indigo-50 hover:bg-indigo-100"
    }
  `;

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-24 pb-8 font-primary bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-all duration-500">
      <div className="max-w-6xl w-full mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image with Zoom Effect */}
            <div className="lg:w-1/2 p-8">
              <div
                ref={zoomRef}
                onMouseMove={isHovering ? handleMouseMove : null}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-96 lg:h-[500px] rounded-xl shadow-lg overflow-hidden bg-cover transition-all duration-300 cursor-zoom-in border border-gray-200/50 dark:border-gray-600/50"
                style={{
                  backgroundImage: `url(${product.imageUrl})`,
                  backgroundSize: isHovering ? "200%" : "cover",
                  backgroundPosition: backgroundPosition,
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full opacity-0 select-none pointer-events-none"
                />
                {isHovering && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    🔍 Zoom
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-8 flex flex-col justify-center space-y-6">
              <Link
                to="/home"
                className="inline-flex items-center w-fit px-4 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 group"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="mr-2 group-hover:-translate-x-1 transition-transform duration-300"
                />
                Back To All Products
              </Link>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                  {product.name}
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">USD</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <label htmlFor="quantity" className="text-slate-700 dark:text-slate-300 font-semibold">
                    Quantity:
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-20 px-4 py-2 border-2 border-slate-200 dark:border-slate-600 rounded-lg 
                        focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 
                        dark:focus:ring-indigo-400/50 dark:focus:border-indigo-400 
                        bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 
                        font-semibold text-center transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <button className={primaryButtonClasses}>
                    <span className="relative z-10 flex items-center gap-3">
                      Add to Cart
                      <FontAwesomeIcon icon={faShoppingCart} className="group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button
                    onClick={handleViewCart}
                    className={secondaryButtonClasses}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      View Cart
                      <FontAwesomeIcon icon={faShoppingBasket} className="group-hover:bounce transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}