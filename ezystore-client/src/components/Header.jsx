import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faTags,
  faSun,
  faMoon,
  faBars,
  faTimes,
  faUser,
  faUserCog,
  faClipboardList,
  faEnvelope,
  faSignOutAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../store/cart-context";
import { useAuth } from "../store/auth-context";
import { useUserRole } from "./useUserRole";
import { toast } from "react-toastify";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const [isUserMenuOpen, setisUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);

  const { totalQuantity } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const { isAdmin } = useUserRole();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setAdminMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setAdminMenuOpen(false);
        dropdownButtonRef.current?.focus();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleMenu = () => {
    setisUserMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setAdminMenuOpen(false);
  };

  const toggleAdminSubmenu = (e) => {
    e?.stopPropagation();
    setAdminMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setAdminMenuOpen(false);
    logout();
    toast.success("Logged out successfully");
    navigate("/home");
  };

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
    setAdminMenuOpen(false);
  };

  const handleDropdownKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown();
    } else if (event.key === "ArrowDown" && !isDropdownOpen) {
      event.preventDefault();
      setIsDropdownOpen(true);
    }
  };

  const handleAdminSubmenuKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleAdminSubmenu();
    }
  };

  const navItems = [
    { path: "home", label: "Home" },
    { path: "about", label: "About" },
    { path: "contact", label: "Contact" },
  ];

  // Dynamic dropdown items based on user role
  const getDropdownItems = () => {
    const baseItems = [
      { path: "/profile", label: "Profile", icon: faUser },
      { path: "/orders", label: "Orders", icon: faClipboardList },
    ];

    if (isAdmin) {
      baseItems.push({
        label: "Admin",
        icon: faUserCog,
        submenu: [
          {
            path: "/admin/orders",
            label: "Manage Orders",
            icon: faClipboardList,
          },
          { path: "/admin/messages", label: "Messages", icon: faEnvelope },
        ],
      });
    }

    return baseItems;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-xl border-b border-gray-200/50 dark:border-gray-700/50"
          : "backdrop-blur-sm bg-white/60 dark:bg-gray-900/60 border-b border-gray-200/30 dark:border-gray-700/30"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            className="group flex items-center space-x-3 py-2 px-1 rounded-xl transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
          >
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <FontAwesomeIcon
                icon={faTags}
                className="text-lg text-gray-700 dark:text-white"
              />
            </div>
            <span
              className="text-2xl font-bold font-primary"
              style={{
                color:
                  theme === "dark"
                    ? "var(--color-lighter)"
                    : "var(--color-dark)",
              }}
            >
              Ezy Stickers
            </span>
          </Link>

          {/* Nav items shifted left */}
          <nav className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-[45%]">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={`/${item.path}`}
                  className={({ isActive }) =>
                    `relative px-5 py-2 rounded-xl font-medium font-primary transition-all duration-300 text-xl ${
                      isActive
                        ? "bg-blue-100/70 dark:bg-gray-700 text-blue-800 dark:text-gray-200"
                        : "text-gray-600 dark:text-gray-300 hover:bg-blue-100/70 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-gray-200"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Toggle Theme"
            >
              <FontAwesomeIcon
                icon={theme === "dark" ? faMoon : faSun}
                className={`w-5 h-5 transition-all duration-300 ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              />
            </button>

            <Link
              to="/cart"
              className="p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-lg relative"
              aria-label="Shopping Cart"
            >
              <FontAwesomeIcon
                icon={faShoppingBasket}
                style={{
                  color:
                    theme === "dark"
                      ? "var(--color-lighter)"
                      : "var(--color-dark)",
                }}
                className="w-5 h-5 transition-colors duration-300"
              />
              {totalQuantity > 0 && (
                <div className="absolute -top-2 -right-2 text-xs bg-yellow-400 text-black font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {totalQuantity}
                </div>
              )}
            </Link>

            {/* User Dropdown / Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  ref={dropdownButtonRef}
                  onClick={toggleDropdown}
                  onKeyDown={handleDropdownKeyDown}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold font-primary backdrop-blur-sm border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                    isDropdownOpen
                      ? "bg-blue-100/70 dark:bg-gray-700 border-blue-300 dark:border-gray-600 text-blue-800 dark:text-gray-200 shadow-lg"
                      : "bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 hover:bg-blue-100/70 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-gray-600 hover:shadow-lg"
                  }`}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isAdmin ? "bg-red-500" : "bg-blue-500"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={isAdmin ? faUserCog : faUser}
                        className="text-white text-xs"
                      />
                    </div>
                    <span className="font-semibold truncate max-w-[8rem] inline-block">
                      {user?.name
                        ? `Hello, ${
                            user.name.split(" ")[0].length > 10
                              ? user.name.split(" ")[0].slice(0, 10) + "..."
                              : user.name.split(" ")[0]
                          }`
                        : "Hello, User"}
                    </span>

                    {isAdmin && (
                      <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm z-20 transition-all duration-200 origin-top-right ${
                    isDropdownOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                      {isAdmin && (
                        <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-1 rounded-full">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {getDropdownItems().map((item) =>
                      !item.submenu ? (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={handleDropdownItemClick}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150 focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-700"
                          role="menuitem"
                          tabIndex={isDropdownOpen ? 0 : -1}
                        >
                          <FontAwesomeIcon
                            icon={item.icon}
                            className="w-4 h-4 text-gray-400 dark:text-gray-500"
                          />
                          {item.label}
                        </Link>
                      ) : (
                        <div key={item.label} className="relative group">
                          <button
                            onClick={toggleAdminSubmenu}
                            onKeyDown={handleAdminSubmenuKeyDown}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150 focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-700"
                            aria-haspopup="true"
                            aria-expanded={isAdminMenuOpen}
                            tabIndex={isDropdownOpen ? 0 : -1}
                            type="button"
                          >
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="w-4 h-4 text-red-500 dark:text-red-400"
                            />
                            {item.label}
                            <FontAwesomeIcon
                              icon={faChevronDown}
                              className={`ml-auto w-3 h-3 transition-transform duration-200 ${
                                isAdminMenuOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {/* Submenu */}
                          <div
                            className={`pl-6 transition-all duration-200 ${
                              isAdminMenuOpen
                                ? "max-h-40 opacity-100"
                                : "max-h-0 opacity-0 pointer-events-none"
                            } overflow-hidden`}
                          >
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.path}
                                to={sub.path}
                                onClick={handleDropdownItemClick}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150 focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-700"
                                role="menuitem"
                                tabIndex={isDropdownOpen ? 0 : -1}
                              >
                                <FontAwesomeIcon
                                  icon={sub.icon}
                                  className="w-4 h-4 text-gray-400 dark:text-gray-500"
                                />
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* Logout Button */}
                  <div className="border-t border-gray-200/50 dark:border-gray-700/50 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-150 focus:outline-none focus:bg-red-50 dark:focus:bg-red-900/20"
                      role="menuitem"
                      tabIndex={isDropdownOpen ? 0 : -1}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="w-4 h-4"
                      />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-xl font-semibold font-primary bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 hover:bg-blue-100/70 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-gray-600 hover:shadow-lg transition-all duration-300"
              >
                Login
              </NavLink>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              aria-label="Toggle Menu"
            >
              <FontAwesomeIcon
                icon={isUserMenuOpen ? faTimes : faBars}
                style={{
                  color:
                    theme === "dark"
                      ? "var(--color-lighter)"
                      : "var(--color-dark)",
                }}
                className="w-5 h-5 transition-colors duration-300"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isUserMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/${item.path}`}
                onClick={() => setisUserMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl font-medium font-primary transition-all duration-300 text-xl ${
                    isActive
                      ? "bg-blue-100/70 dark:bg-gray-700 text-blue-800 dark:text-gray-200"
                      : "text-gray-600 dark:text-gray-300 hover:bg-blue-100/70 dark:hover:bg-gray-700 hover:text-blue-800 dark:hover:text-gray-200"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setisUserMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-4 h-4 text-gray-400 dark:text-gray-500"
                  />
                  Profile
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setisUserMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    className="w-4 h-4 text-gray-400 dark:text-gray-500"
                  />
                  Orders
                </Link>

                {/* Admin menu for mobile - only show if user is admin */}
                {isAdmin && (
                  <div>
                    <button
                      onClick={() => setAdminMenuOpen((open) => !open)}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 focus:outline-none"
                      type="button"
                    >
                      <FontAwesomeIcon
                        icon={faUserCog}
                        className="w-4 h-4 text-red-500 dark:text-red-400"
                      />
                      Admin
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ml-auto w-3 h-3 transition-transform duration-200 ${
                          isAdminMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`pl-8 transition-all duration-200 ${
                        isAdminMenuOpen
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0 pointer-events-none"
                      } overflow-hidden`}
                    >
                      <Link
                        to="/admin/orders"
                        onClick={() => setisUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <FontAwesomeIcon
                          icon={faClipboardList}
                          className="w-4 h-4 text-gray-400 dark:text-gray-500"
                        />
                        Manage Orders
                      </Link>
                      <Link
                        to="/admin/messages"
                        onClick={() => setisUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                      >
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="w-4 h-4 text-gray-400 dark:text-gray-500"
                        />
                        Messages
                      </Link>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    setisUserMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-xl text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800 transition-colors duration-150"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
