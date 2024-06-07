# React Dynamic Form Builder

A dynamic form component for React that allows you to quickly create forms with various input types, including text, email, password, number, checkbox, radio, and select.

Supports customizable validators and custom buttons.

## Installation

You can install the package via npm:

```bash
npm install dynamic-form-react
```

## Usage

```javascript
import React from "react";
import {
  Form,
  required,
  maxLength,
  minLength,
  minValue,
  maxValue,
  number,
  email,
} from "dynamic-form-react";

function App() {
  const is_equal_test = (input_str) =>
    input_str.toLowerCase() === "test" ? "Test is not allowed" : undefined;

  const customButtonHandler = () => {
    console.log("Hello");
  };

  const inputs = [
    {
      type: "email",
      name: "email",
      label: "Email",
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      validators: [required, minLength(5), maxLength(10)],
      required: true,
    },
    {
      type: "number",
      name: "number",
      label: "Number",
      min: 0,
      max: 100,
      validators: [required, maxValue(5), minValue(2)],
      required: true,
    },
    {
      type: "checkbox",
      name: "countries",
      label: "Countries",
      options: ["India", "USA", "UK", "Australia", "Canada", "Germany"],
      required: true,
      validators: [required],
    },
    {
      type: "radio",
      name: "gender",
      options: ["male", "female", "other"],
      label: "Gender",
      initialvalue: "male",
      required: true,
    },
    {
      type: "select",
      name: "fruits",
      label: "Fruits",
      options: [
        { value: "", label: "Please Select a Value" },
        { value: 1, label: "Apple" },
        { value: 2, label: "Orange" },
      ],
      validators: [required],
      required: true,
    },
    {
      type: "select",
      name: "Counting",
      label: "Numbers",
      options: [
        { value: 1, label: "One" },
        { value: 2, label: "Two" },
      ],
      multiple: true,
      validators: [required],
      required: true,
    },
    {
      type: "color",
      name: "color",
      label: "Color",
    },
    {
      type: "range",
      name: "range",
      label: "Range",
      min: 0,
      max: 10,
      initialvalue: 5,
      step: 3,
      validators: [required],
    },
    {
      type: "text",
      name: "text",
      label: "Text",
      validators: [is_equal_test],
    },
    {
      type: "button",
      name: "button-my",
      label: "Custom Button",
      handler: customButtonHandler,
    },
    {
      type: "tel",
      name: "tel",
      label: "Tel (xxx)-xxx-xxxx",
      pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
      validators: [required],
    },
    {
      type: "time",
      name: "time",
      label: "Time",
      validators: [required],
    },
    {
      type: "url",
      name: "url",
      label: "Url",
      validators: [required],
    },
    {
      type: "week",
      name: "week",
      label: "Week",
      validators: [required],
    },
    {
      type: "date",
      name: "date",
      label: "Date",
    },
    {
      type: "datetime-local",
      name: "datetime-local",
      label: "Datetime-local",
    },
    {
      type: "file",
      name: "file",
      label: "File",
    },
    {
      type: "hidden",
      name: "hidden",
      label: "Hidden",
    },
    {
      type: "image",
      name: "image",
      label: "Image",
    },
    {
      type: "month",
      name: "month",
      label: "Month",
    },
    {
      type: "radio",
      name: "radio",
      label: "Radio",
    },
  ];

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="App">
      <Form
        form_title={form_title} //"Sign_In"
        inputs={inputs}
        image_metadata={{
          src: { src }, // "https://i.insider.com/526e70dbecad040247237811?width=1300&format=jpeg&auto=webp"
          alt: { alt_text }, // "Apple Logo"
        }}
        onSubmit={onSubmit}
        submit_button_text={submit_button_text} //"Sign In"
      />
    </div>
  );
}

export default App;
```

## Features

- Supports multiple input types including text, email, password, number, checkbox, radio, select, etc.
- Easy to use with a simple configuration object for each input.
- Customizable validators for input validation.
- Ability to create custom buttons with custom handlers.
- Supports adding an image to the form.
- Allows setting the form title.
- Allows customizing the submit button text.

## Example Usage

### Basic Form

```javascript
const inputs = [
  {
    type: "email",
    name: "email",
    label: "Email",
  },
];

const onSubmit = (values) => {
  console.log(values);
};

<Form inputs={inputs} onSubmit={onSubmit} />;
```

### Using Validators

```javascript
import { required, email } from "dynamic-form-react";

const inputs = [
  {
    type: "email",
    name: "email",
    label: "Email",
    validators: [required, email],
  },
];

const onSubmit = (values) => {
  console.log(values);
};

<Form inputs={inputs} onSubmit={onSubmit} />;
```

### Custom Button with Handler

```javascript
const inputs = [
  {
    type: "button",
    name: "customButton",
    label: "Custom Button",
    handler: () => {
      console.log("Custom button clicked!");
    },
  },
];

const onSubmit = (values) => {
  console.log(values);
};

<Form inputs={inputs} onSubmit={onSubmit} />;
```

## Including Other Input Types

You can include a variety of other input types in your form by configuring them in the `inputs` array. Below are some examples:

### Number Input

```javascript
const inputs = [
  {
    type: "number",
    name: "number",
    label: "Number",
    min: 0,
    max: 10,
    validators: [required, maxValue(5), minValue(2)],
    required: true,
  },
];
```

### Checkbox Input

```javascript
const inputs = [
  {
    type: "checkbox",
    name: "Countries",
    label: "Countries of the world",
    options: ["India", "USA", "UK", "Australia", "Canada", "Germany"],
    required: true,
    validators: [required],
  },
];
```

### Radio Input

```javascript
const inputs = [
  {
    type: "radio",
    name: "gender",
    options: ["male", "female", "other"],
    label: "Gender",
    initialvalue: "male",
    required: true,
  },
];
```

### Range Input

```javascript
const inputs = [
  {
    type: "range",
    name: "range",
    label: "Range",
    min: 0,
    max: 10,
    initialvalue: 5,
    step: 3,
    validators: [required],
  },
];
```

<!-- ## Screenshots

![Form Screenshot](path/to/screenshot.png) -->

## Validators

Custom validators can be created and passed along with the input configuration. Validators are functions that take the input value as an argument and return an error message if validation fails, or `undefined` if validation passes.

## Customization

You can customize the appearance of the form by applying your own CSS styles.

## Feedback

If you have any feedback, suggestions, or issues, feel free to open an issue on GitHub.

## License

This project is licensed under the MIT License.
