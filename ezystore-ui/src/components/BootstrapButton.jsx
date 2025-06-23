import React from "react";

export const BootstrapButton = ({ text, type }) => {
  return <button className={`btn btn-${type}`}>{text}</button>;
};
