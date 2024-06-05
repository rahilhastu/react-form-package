import React, { useState, useEffect } from "react";
import "./Form.css";
import Input from "./Input";
import InputRadio from "./InputRadio";
import InputCheckbox from "./InputCheckbox";
import InputSelect from "./InputSelect";
import InputSelectMulti from "./InputSelectMulti";

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
      if (
        input.type === "checkbox" ||
        (input.type === "select" && input.multiple)
      ) {
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
      if (
        input.required &&
        (input.type === "checkbox" ||
          (input.type === "select" && input.multiple))
      ) {
        if (
          !updatedFormData[input.name] ||
          updatedFormData[input.name].length === 0
        ) {
          newErrors[input.name] = "Please select at least one option.";
          return;
        }
      } else if (input.validators) {
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
      if (
        field.required &&
        (field.type === "checkbox" ||
          (field.type === "select" && field.multiple))
      ) {
        return updatedFormData[field.name].length > 0;
      }
      if (field.required) {
        return updatedFormData[field.name] !== "";
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
    if (type === "select-multiple") {
      const updatedFormData = {
        ...values,
        [name]: Array.from(e.target.selectedOptions, (option) => option.value),
      };
      setValues(updatedFormData);
      validateForm(updatedFormData);

      const selectedOptions = Array.from(e.target.selectedOptions);
      const selectedValues = selectedOptions.map((option) => option.label);
      const inputField = document.querySelector(`#${name}`);
      const label = inputField.parentElement.querySelector("label");

      inputField.value = selectedValues.join(", ");

      if (selectedValues.length > 0) {
        label.classList.add("label-float");
      } else {
        label.classList.remove("label-float");
      }

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
            ) : input.type === "radio" ? (
              <InputRadio
                name={input.name}
                label={input.label}
                options={input.options}
                value={values[input.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[input.name] ? errors[input.name] : ""}
                required={input.required || false}
              />
            ) : input.type === "checkbox" ? (
              <InputCheckbox
                name={input.name}
                label={input.label}
                options={input.options}
                values={values[input.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[input.name] ? errors[input.name] : ""}
                required={input.required || false}
              />
            ) : input.type === "select" && !input.multiple ? (
              <InputSelect
                name={input.name}
                label={input.label}
                options={input.options}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[input.name] ? errors[input.name] : ""}
                required={input.required || false}
                multiple={input.multiple || false}
              />
            ) : input.type === "select" && input.multiple ? (
              <InputSelectMulti
                name={input.name}
                label={input.label}
                options={input.options}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[input.name] ? errors[input.name] : ""}
                required={input.required || false}
              />
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
                required={input.required || false}
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
