import React, { useState } from "react";
import { useCart } from "../store/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTimes, 
  faShoppingCart, 
  faMinus,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function CartTable() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [animatingItems, setAnimatingItems] = useState(new Set());

  const subtotal = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const updateCartQuantity = (productId, quantity) => {
    const product = cart.find((item) => item.productId === productId);
    
    // Subtle animation feedback
    setAnimatingItems(prev => new Set([...prev, productId]));
    setTimeout(() => {
      setAnimatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }, 300);
    
    addToCart(product, quantity - (product?.quantity || 0));
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-96 max-w-4xl mx-auto my-8 w-full font-primary flex items-center justify-center">
        <div className="text-center space-y-4 p-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
          <FontAwesomeIcon 
            icon={faShoppingCart} 
            className="text-6xl text-slate-300 dark:text-slate-600"
          />
          <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300">
            Your cart is empty
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Add some products to get started
          </p>
          {/* Modern Back to Products Button */}
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group"
          >
            <FontAwesomeIcon 
              icon={faArrowLeft} 
              className="mr-2 text-sm group-hover:-translate-x-1 transition-transform duration-200" 
            />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-80 max-w-5xl mx-auto my-8 w-full font-primary">
      {/* Clean, professional container */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        
        {/* Simple header */}
        <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
            Shopping Cart
          </h2>
        </div>

        {/* Cart table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 text-sm font-medium text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-4 py-4 text-center">Quantity</th>
                <th className="px-4 py-4 text-center">Price</th>
                <th className="px-4 py-4 text-center">Total</th>
                <th className="px-4 py-4 text-center">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {cart.map((item) => (
                <tr
                  key={item.productId}
                  className={`text-sm sm:text-base text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 ${
                    animatingItems.has(item.productId) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <Link
                      to={`/products/${item.productId}`}
                      state={{ product: item }}
                      className="flex items-center group"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover mr-4 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                      />
                      <div>
                        <h3 className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {item.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          SKU: {item.productId}
                        </p>
                      </div>
                    </Link>
                  </td>

                  {/* Quantity */}
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
                        disabled={item.quantity <= 1}
                      >
                        <FontAwesomeIcon 
                          icon={faMinus} 
                          className="text-xs group-hover:scale-110 transition-transform duration-200" 
                        />
                      </button>
                      
                      <input
                        type="number"
                        inputMode="numeric"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartQuantity(
                            item.productId,
                            parseInt(e.target.value, 10) || 1
                          )
                        }
                        className="w-16 h-8 text-center border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:ring-blue-400/50 dark:focus:border-blue-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm transition-all duration-200"
                        min="1"
                      />
                      
                      <button
                        onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
                      >
                        <FontAwesomeIcon 
                          icon={faPlus} 
                          className="text-xs group-hover:scale-110 transition-transform duration-200" 
                        />
                      </button>
                    </div>
                  </td>

                  {/* Unit Price */}
                  <td className="px-4 py-4 text-center">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      ${item.price.toFixed(2)}
                    </span>
                  </td>

                  {/* Total Price */}
                  <td className="px-4 py-4 text-center">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </td>

                  {/* Remove */}
                  <td className="px-4 py-4 text-center">
                    <button
                      aria-label="Remove item"
                      onClick={() => handleRemoveItem(item.productId)}
                      className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 group"
                    >
                      <FontAwesomeIcon 
                        icon={faTrash} 
                        className="text-sm group-hover:scale-110 group-hover:rotate-12 transition-all duration-200" 
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Clean subtotal section */}
        <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="text-slate-600 dark:text-slate-400">
              <span className="text-sm">Items in cart: </span>
              <span className="font-medium">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                Subtotal
              </div>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                ${subtotal}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}