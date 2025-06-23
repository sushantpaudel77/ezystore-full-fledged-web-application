import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      Buit with
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
