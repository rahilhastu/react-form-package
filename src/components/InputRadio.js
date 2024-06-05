import React from "react";
import "./Form.css";
import PropTypes from "prop-types";

const InputRadio = ({
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  required,
  error,
}) => (
  <>
    <span className={required ? "required-marker" : ""}>{label}</span>
    <div className="radio_group_options">
      {options.map((option) => (
        <span key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={onChange}
            onBlur={onBlur}
          />
          {option}
        </span>
      ))}
    </div>
    {error && <span className="form-error">{error}</span>}
  </>
);

InputRadio.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputRadio;
