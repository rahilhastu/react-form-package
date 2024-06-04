import React, { useState, useEffect } from "react";
import "./Form.css";
import Input from "./Input";

const Form = ({
  form_title,
  inputs,
  onSubmit,
  image_metadata,
  submit_button_text,
}) => {
  const [values, setValues] = useState(
    inputs.reduce((acc, input) => {
      if (input.type !== "button") {
        acc[input.name] = input.initialvalue || "";
      }
      if (input.type === "checkbox") {
        if (input.initialvalue) {
          acc[input.name] = input.initialvalue;
        } else {
          acc[input.name] = [];
        }
      }
      return acc;
    }, {})
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [errorCount, setErrorCount] = useState(0);

  const validateForm = (updatedFormData) => {
    const newErrors = {};
    inputs.forEach((input) => {
      if (input.validators) {
        for (let validator of input.validators) {
          const error = validator(updatedFormData[input.name]);
          if (error) {
            newErrors[input.name] = error;
            break;
          }
        }
      }
    });
    setErrors(newErrors);
    setErrorCount(Object.keys(newErrors).length);
    const isFormValid = inputs.every((field) => {
      if (field.required) {
        return updatedFormData[field.name].trim() !== "";
      }
      return true;
    });
    setIsFormValid(isFormValid && Object.keys(newErrors).length === 0);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const updatedFormData = {
        ...values,
        [name]: values[name].includes(value)
          ? values[name].filter((val) => val !== value)
          : [...values[name], value],
      };
      setValues(updatedFormData);
      validateForm(updatedFormData);
      return;
    }
    const updatedFormData = {
      ...values,
      [name]: value,
    };
    setValues(updatedFormData);
    validateForm(updatedFormData);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  useEffect(() => {
    validateForm(values);
  }, [values]);

  const handleValidation = () => {
    validateForm(values);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }
    onSubmit(values);
  };

  return (
    <div className="form-container">
      {image_metadata && (
        <img src={image_metadata.src} alt={image_metadata.alt} />
      )}
      {form_title && <h1>{form_title}</h1>}
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <div className="form-group" key={input.name}>
            {input.type === "button" ? (
              <button
                type="button"
                onClick={input.handler}
                className="form-button"
              >
                {input.label}
              </button>
            ) : input.type === "radio" || input.type === "checkbox" ? (
              <>
                <div className={input.type + "_label "}>
                  <label>{input.label}</label>
                </div>
                <div className={input.type + "_group"}>
                  {input.options.map((option) => (
                    <div key={option}>
                      <Input
                        type={input.type}
                        id={`${input.name}_${option}`}
                        name={input.name}
                        label={option}
                        value={option}
                        checked={
                          Array.isArray(values[input.name])
                            ? values[input.name].includes(option)
                            : values[input.name] === option
                        }
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <Input
                type={input.type}
                id={input.id || input.name}
                name={input.name}
                value={values[input.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                label={
                  input.type === "range"
                    ? `${input.label}: ${values[input.name]}`
                    : input.label
                }
                error={touched[input.name] ? errors[input.name] : ""}
                required={input.required}
                {...input}
              />
            )}
          </div>
        ))}
        <button
          className="form-submit-button"
          type="submit"
          disabled={!isFormValid || errorCount > 0}
        >
          {submit_button_text || "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
