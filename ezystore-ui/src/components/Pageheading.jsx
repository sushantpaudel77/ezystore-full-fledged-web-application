import React from "react";
import PageTitle from "./PageTitle";

export default function Pageheading({title,children}) {
  return (
    <div className="page-heading-container">
      <PageTitle title={title}/>
      <p className="page-heading-paragraph">{children}</p>
    </div>
  );
}
