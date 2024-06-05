import React from "react";
import PropTypes from "prop-types";
import "./Form.css";

const InputSelect = ({
  name,
  id,
  onChange,
  onBlur,
  label,
  options,
  error,
  required = false,
}) => {
  return (
    <>
      <select
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={name} className={required ? "required-marker" : ""}>
        {label}
      </label>
      {error && <span className="form-error">{error}</span>}
    </>
  );
};

InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
};

export default InputSelect;
