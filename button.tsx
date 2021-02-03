/* eslint-disable react/button-has-type */
import React from "react";
import startCase from "lodash";

type ButtonProps = {
  className?: string;
  name: string;
  onClick?: any;
  type: "submit" | "button" | "reset";
};

export const Button = ({
  className = "govuk-button",
  name,
  onClick = "",
  type,
}: ButtonProps): JSX.Element => (
  <button
    aria-label={`${name} form button`}
    className={`govuk-button ${className}`}
    id={name}
    name={name}
    type={type}
    onClick={onClick}
  >
    {startCase(name)}
    {name.charAt(0).toUpperCase() + name.substring(1)}
  </button>
);

export default Button;
