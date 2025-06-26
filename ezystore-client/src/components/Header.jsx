import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faSun,
  faMoon,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

// For demo purposes, using regular anchor tags
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>{children}</a>
);
const NavLink = ({ to, children, className, ...props }) => (
  <a href={to} className={typeof className === 'function' ? className({ isActive: false }) : className} {...props}>{children}</a>
);

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const navItems = [
    { path: "home", label: "Home" },
    { path: "about", label: "About" },
    { path: "contact", label: "Contact" },
    { path: "login", label: "Login" }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-xl border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 border-b border-gray-200/30 dark:border-gray-700/30'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex items-center space-x-3 py-2 px-1 rounded-xl transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
          >
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <FontAwesomeIcon 
                icon={faTags} 
                className="text-gray-700 dark:text-gray-200 text-lg"
              />
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white font-primary">
              Ezy Stickers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/${item.path}`}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl font-semibold font-primary transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-gray-700 dark:bg-gray-600 shadow-lg'
                      : 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Toggle Theme"
            >
              <FontAwesomeIcon
                icon={theme === "dark" ? faMoon : faSun}
                className={`w-5 h-5 transition-all duration-300 ${
                  theme === "dark" 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Shopping Cart"
            >
              <FontAwesomeIcon
                icon={faShoppingBasket}
                className="w-5 h-5 text-gray-700 dark:text-gray-200 transition-colors duration-300"
              />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
              aria-label="Toggle Menu"
            >
              <FontAwesomeIcon
                icon={isMenuOpen ? faTimes : faBars}
                className="w-5 h-5 text-gray-700 dark:text-gray-200 transition-colors duration-300"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/${item.path}`}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl font-semibold font-primary transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-gray-700 dark:bg-gray-600 shadow-lg'
                      : 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}