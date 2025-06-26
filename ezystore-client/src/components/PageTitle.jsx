import React from "react";

export default function PageTitle({ title, className = "" }) {
  return (
    <h1
      className={`text-3xl md:text-4xl font-primary font-extrabold text-center text-primary dark:text-lighter tracking-tight leading-tight mb-2 ${className}`}
    >
      {title}
    </h1>
  );
}
