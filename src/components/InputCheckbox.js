import React from "react";
import "./Form.css";
import PropTypes from "prop-types";

const InputCheckbox = ({
  name,
  label,
  options,
  values,
  onChange,
  onBlur,
  required,
  error,
}) => (
  <>
    <span className={required ? "required-marker" : ""}>{label}</span>
    <div className="checkbox_group_options">
      {options.map((option) => (
        <span key={option}>
          <input
            type="checkbox"
            name={name}
            value={option}
            checked={values.includes(option)}
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

InputCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputCheckbox;
