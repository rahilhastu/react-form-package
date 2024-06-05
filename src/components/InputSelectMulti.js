import React from "react";
import PropTypes from "prop-types";
import "./Form.css";

const InputSelect = ({
  name,
  id,
  value,
  onChange,
  onBlur,
  label,
  options,
  error,
  required = false,
}) => {
  return (
    <div className="custom-multi-select-container">
      <input
        type="text"
        id="Counting"
        name="Counting"
        className="custom-multi-select-input"
        readOnly
      />
      <label htmlFor={name} className={required ? "required-marker" : ""}>
        {label}
      </label>
      <span className="dropdown-icon">&or;</span>
      <div className="custom-multi-select-dropdown">
        <select
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          multiple
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="multi-select-option"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
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
