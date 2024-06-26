import React from "react";
import PropTypes from "prop-types";
import "./Form.css";

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

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
