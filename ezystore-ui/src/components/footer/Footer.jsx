import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./footer.module.css";
import styled from "styled-components";
import EzyButton from "../../EzyButton";

const H1 = styled.h1`
  color: #5b21b6;
  text-align: center;
`;

export default function Footer() {
  const isActive = Math.random() > 0.5;
  return (
    <>
      {/* <H1>Demo of Style Components from footer!</H1>
      <EzyButton $primary>Submit</EzyButton> */}
      {/* <h1
        className={`${styles["my-heading"]} ${
          isActive ? styles["primary-color"] : styles["secondary-color"]
        }`}
      >
        Demo of Global Inline Css
      </h1> */}
      {/* <h1 className="my-heading">Demo of Global Css Scope from Footer</h1> */}
      <footer className={styles.footer}>
        Buit with
        <FontAwesomeIcon
          icon={faHeart}
          className={styles["footer-icon"]}
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
    </>
  );
}
