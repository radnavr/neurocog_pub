import React from "react";

const InputField = ({
  componentStyle,
  inputName,
  inputStyle,
  inputType,
  labelStyle,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <div className={componentStyle}>
      <label className={labelStyle} htmlFor={inputName}>
        {inputName}
      </label>
      <input
        autoComplete="off"
        className={inputStyle}
        placeholder={placeholder}
        id={inputName}
        onChange={onChange}
        required
        type={inputType}
        value={value}
      />
    </div>
  );
};

export default InputField;
