import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  faArrowLeft,
  faShoppingCart,
  faShoppingBasket,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../store/cart-context";

// Separate QuantityControl component
const QuantityControl = ({ quantity, setQuantity }) => {
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) ? 1 : Math.max(1, value));
  };

  return (
    <div className="flex items-center border-2 border-slate-200 dark:border-slate-600 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors duration-300">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="w-10 h-12 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faMinus} className="text-sm" />
      </button>
      
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={handleChange}
        className="w-16 px-0 py-3 text-center bg-transparent text-slate-900 dark:text-slate-100 font-bold text-lg focus:outline-none focus:ring-0"
      />
      
      <button
        onClick={handleIncrement}
        className="w-10 h-12 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
      >
        <FontAwesomeIcon icon={faPlus} className="text-sm" />
      </button>
    </div>
  );
};

export default function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const zoomRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product }, quantity);
  };

  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      zoomRef.current.getBoundingClientRect();
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

  const styles = `
    @keyframes jiggleLeft {
      0%, 100% {
        transform: translateX(0);
      }
      20% {
        transform: translateX(-4px) rotate(-4deg);
      }
      40% {
        transform: translateX(-2px) rotate(2deg);
      }
      60% {
        transform: translateX(-3px) rotate(-2deg);
      }
      80% {
        transform: translateX(-1px) rotate(1deg);
      }
    }

    @keyframes pulseGlow {
      0%, 100% {
        box-shadow: 0 0 5px rgba(99, 102, 241, 0.3);
      }
      50% {
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
      }
    }

    .quantity-input:focus {
      animation: pulseGlow 2s ease-in-out infanite;
    }
  `;

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-40 pb-8 font-primary bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-all duration-500">
      <style>{styles}</style>
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
                className="inline-flex items-center w-fit px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-500 group relative overflow-hidden border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-700 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></div>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="mr-3 text-xl transition-all duration-500 ease-out group-hover:-translate-x-1 group-hover:scale-110"
                  style={{
                    animation: "jiggleLeft 3s ease-in-out infinite",
                  }}
                />
                <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                  Back To All Products
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-700 ease-out"></div>
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
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    USD
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <label
                    htmlFor="quantity"
                    className="text-slate-700 dark:text-slate-300 font-semibold"
                  >
                    Quantity:
                  </label>
                  <QuantityControl quantity={quantity} setQuantity={setQuantity} />
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full flex justify-center items-center gap-3 px-8 py-4 text-white text-lg font-bold rounded-xl shadow-lg bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-light dark:to-primary dark:hover:from-primary dark:hover:to-light hover:scale-105 active:scale-95 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Add to Cart
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="group-hover:rotate-12 transition-transform duration-300"
                      />
                    </span>
                  </button>

                  <button
                    onClick={handleViewCart}
                    className="w-full flex justify-center items-center gap-3 px-8 py-4 text-lg font-bold rounded-xl shadow-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      View Cart
                      <FontAwesomeIcon
                        icon={faShoppingBasket}
                        className="group-hover:bounce transition-transform duration-300"
                      />
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