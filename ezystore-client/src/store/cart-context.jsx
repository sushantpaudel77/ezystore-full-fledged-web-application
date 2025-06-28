import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // const [cart, setCart] = useState(() => {
  //   try {
  //     const storedCart = localStorage.getItem("cart");
  //     return storedCart ? JSON.parse(storedCart) : [];
  //   } catch (error) {
  //     console.log("Failed to parse cart from localStorage: ", error);
  //     return [];
  //   }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.log("Failed to save cart to the localStorage", error);
    }
  }, [cart]);

  // const addToCart = (product, quantity) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find(
  //       (item) => item.productId === product.productId
  //     );

  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item.productId === product.productId
  //           ? { ...item, quantity: item.quantity + quantity }
  //           : item
  //       );
  //     }

  //     return [...prevCart, { ...product, quantity }];
  //   });
  // };

  // const removeFromCart = (productId) => {
  //   setCart((prevCart) =>
  //     prevCart.filter((item) => item.productId !== productId)
  //   );
  // };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, totalQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
