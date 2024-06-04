import React from "react";

const Input = ({
  type,
  name,
  id,
  value,
  onChange,
  onBlur,
  label,
  error,
  required = false,
  ...props
}) => {
  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder=" "
        required={required}
        autoComplete="on"
        {...props}
      />
      <label htmlFor={name} className={required ? "required-marker" : ""}>
        {label}
      </label>
      {error && <span className="form-error">{error}</span>}
    </>
  );
};

export default Input;
