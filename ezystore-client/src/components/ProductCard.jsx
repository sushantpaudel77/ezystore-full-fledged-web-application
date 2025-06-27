import React, { useContext } from "react";
import Price from "./Price";
import { Link } from "react-router-dom";
import { CartContext } from "../store/cart-context";

export default function ProductCard({ product }) {
 const {addToCart} = useContext(CartContext);

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-800 transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
      {/* Product Image (non-clickable now) */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Product Name (non-clickable now) */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 truncate">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-5">
          {/* Price */}
          <div className="text-lg font-bold text-primary dark:text-light">
            <Price currency="$" price={product.price} />
          </div>

          {/* Only Add to Cart is clickable now */}
          <Link
            to={`/products/${product.productId}`}
            state={{ product }}
            className="px-4 py-2 text-white text-sm font-semibold rounded-xl shadow-lg bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-light dark:to-primary dark:hover:from-primary dark:hover:to-light hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            onClick={addToCart}
          >
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
