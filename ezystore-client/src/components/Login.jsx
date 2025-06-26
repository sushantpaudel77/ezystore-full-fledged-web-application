import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  faArrowLeft,
  faShoppingCart,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef } from "react";

export default function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const zoomRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");

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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 font-primary 
      bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 
      dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/30 
      transition-all duration-500 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-300/10 to-blue-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl 
          border border-white/30 dark:border-gray-700/30 overflow-hidden
          ring-1 ring-black/5 dark:ring-white/10
          hover:shadow-3xl transition-all duration-700
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none">
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
                {/* Invisible image for accessibility and SEO */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full opacity-0 select-none pointer-events-none"
                />
                
                {/* Zoom indicator */}
                {isHovering && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                    🔍 Zoom
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 p-8 flex flex-col justify-center space-y-6">
              {/* Back Button */}
              <Link
                to="/home"
                className="inline-flex items-center w-fit px-4 py-2 rounded-lg font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 group"
              >
                <FontAwesomeIcon 
                  icon={faArrowLeft} 
                  className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" 
                />
                Back To All Products
              </Link>

              {/* Product Info */}
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

              {/* Controls */}
              <div className="space-y-6">
                {/* Quantity Input */}
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
                        focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                        dark:focus:ring-blue-400/50 dark:focus:border-blue-400 
                        bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 
                        font-semibold text-center transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Add to Cart Button */}
                  <button className="group w-full flex justify-center items-center gap-3 px-8 py-4 text-white text-lg font-bold rounded-xl 
                    bg-primary hover:bg-primary/90 
                    dark:bg-gradient-to-r dark:from-light dark:to-primary dark:hover:from-primary dark:hover:to-light 
                    shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] 
                    transition-all duration-300 relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      Add to Cart
                      <FontAwesomeIcon icon={faShoppingCart} className="group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* View Cart Button */}
                  <button
                    onClick={handleViewCart}
                    className="group w-full flex justify-center items-center gap-3 px-8 py-4 text-lg font-bold rounded-xl
                      bg-primary hover:bg-primary/90 
                      dark:bg-gradient-to-r dark:from-light dark:to-primary dark:hover:from-primary dark:hover:to-light
                      shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] 
                      transition-all duration-300 relative overflow-hidden text-white"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      View Cart
                      <FontAwesomeIcon icon={faShoppingBasket} className="group-hover:bounce transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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