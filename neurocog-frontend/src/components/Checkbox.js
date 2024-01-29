import React from "react";

const Checkbox = ({
  componentStyle,
  inputName,
  inputStyle,
  labelStyle,
  onChange,
  value,
}) => {
  return (
    <div className={componentStyle}>
      <label className={labelStyle} htmlFor={inputName}>
        {inputName}
      </label>
      <input
        className={inputStyle}
        type="checkbox"
        id={inputName}
        value={value}
        checked={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Checkbox;
