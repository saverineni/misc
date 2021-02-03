import React from "react";

type TextInputProps = {
  className?: string;
  name: string;
  reference: any;
  type?: string;
  defaultValue?: string;
};

export const TextInput = ({
  className = "govuk-input",
  name,
  reference,
  type = "text",
  defaultValue = "",
}: TextInputProps) => (
  <input
    aria-label={`text input for ${name}`}
    className={`govuk-input ${className}`}
    id={name}
    name={name}
    type={type}
    ref={reference}
    defaultValue={defaultValue}
  />
);

export default TextInput;
