import React from "react";
import Price from "./Price";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({ product }) {
  const { cart, addToCart } = useCart();

  const isInCart = cart.some(item => item.productId === product.productId);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-800 transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
      {/* Product Image */}
      <Link
        to={`/products/${product.productId}`}
        state={{ product }}
        className="relative w-full aspect-square overflow-hidden block"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Cart Icon - GREEN if already in cart */}
        <div className={`absolute top-3 right-3 ${isInCart ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-300`}>
          <div className={`w-10 h-10 ${isInCart ? 'bg-green-500 dark:bg-green-600' : 'bg-white/90 dark:bg-gray-900/90'} backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200`}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={`${isInCart ? 'text-white' : 'text-primary dark:text-light'} text-sm`}
            />
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5">
        <Link to={`/products/${product.productId}`} state={{ product }}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 truncate hover:text-primary dark:hover:text-light transition-colors duration-200 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-5">
          {/* Price */}
          <div className="text-lg font-bold text-primary dark:text-light">
            <Price currency="$" price={product.price} />
          </div>

          {/* Add to Cart Button (ALWAYS same) */}
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 text-white text-sm font-semibold rounded-xl shadow-lg bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-light dark:to-primary dark:hover:from-primary dark:hover:to-light hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 group"
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="mr-2 text-xs group-hover:scale-110 transition-transform duration-200"
            />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
