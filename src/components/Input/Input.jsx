import "./input.css";

import { useState, useEffect } from "react";

export default function Input(props) {
  const [value, setValue] = useState(props.value || "");

  const { onChange: onChangeValue } = props;

  const onChange = (e) => {
    setValue(e.target.value);
    onChangeValue(props.name, e.target.value);
  };

  useEffect(() => {
    onChangeValue(props.name, props.value || "");
  }, [onChangeValue, props.name, props.value]);

  const inputElement = props.textarea ? (
    <textarea
      min={0}
      onChange={onChange}
      value={value}
      type={props.type}
    ></textarea>
  ) : (
    <input min={0} onChange={onChange} value={value} type={props.type} />
  );

  return (
    <div className="input">
      <label htmlFor={props.name}>{props.label}</label>
      {inputElement}
    </div>
  );
}
