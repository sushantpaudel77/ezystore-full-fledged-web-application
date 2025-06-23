import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTags } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

export function Footer() {
  return (
    <footer className="footer">
      Build with{" "}
      <FontAwesomeIcon
        icon={faHeart}
        className="footer-icon"
        aria-hidden="true"
      />
      by
      <a
        href="https://github.com/sushantpaudel77/"
        target="_blank"
        rel="noreferrer"
      >
        sushant
      </a>
    </footer>
  );
}
