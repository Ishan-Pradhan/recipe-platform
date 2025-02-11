import React from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scrollToTop";

const Button = ({ color, cases, content, border, px, py, link }) => {
  const paddingX = px ? `px-${px}` : "px-6";
  const paddingY = py ? `py-${py}` : "py-3";
  return (
    <Link
      to={link ? link : ""}
      onClick={scrollToTop}
      className={`bg-${color} ${paddingX} ${paddingY} rounded-full ${cases} font-semibold ${
        border ? "border-2" : ""
      } `}
    >
      {content}{" "}
    </Link>
  );
};

export default Button;
