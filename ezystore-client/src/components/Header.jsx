import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className="border-b border-gray-300 sticky top-0 z-20 bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <a
          href="/"
          className="flex items-center gap-2 text-lg font-primary font-semibold text-primary"
        >
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Ezy Stickers</span>
        </a>

        <nav className="z-10">
          <ul className="flex items-center space-x-6">
            <li>
              <a href="/" className="text-lg font-primary font-semibold text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-lg font-primary font-semibold text-primary">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-lg font-primary font-semibold text-primary">
                Contact
              </a>
            </li>
            <li>
              <a href="/login" className="text-lg font-primary font-semibold text-primary">
                Login
              </a>
            </li>
            <li>
              <a href="/cart" className="text-primary">
                <FontAwesomeIcon icon={faShoppingBasket} className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
