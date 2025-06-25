import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary dark:text-lighter py-2 hover:text-dark dark:hover:text-light";

  return (
    <header className="border-b border-gray-300 dark:border-gray-700 sticky top-0 z-20 bg-normalbg dark:bg-darkbg shadow-sm dark:shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <Link to="/" className={`${navLinkClass} flex items-center gap-2`}>
          <FontAwesomeIcon icon={faTags} className="h-6 w-6" />
          <span className="text-xl font-bold">Ezy Stickers</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-primary dark:border-light transition hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faMoon : faSun}
              className="w-4 h-4 text-primary dark:text-lighter"
            />
          </button>
          <ul className="flex items-center space-x-6">
            {["home", "about", "contact", "login"].map((path) => (
              <li key={path}>
                <NavLink
                  to={`/${path}`}
                  className={({ isActive }) =>
                    isActive ? `underline ${navLinkClass}` : navLinkClass
                  }
                >
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/cart" className="text-primary dark:text-lighter py-2">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
