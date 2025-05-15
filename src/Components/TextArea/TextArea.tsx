import React, { CSSProperties, ChangeEvent, Dispatch } from "react"
import "./TextArea.css";

type TextAreaProps = {
  htmlFor?: string;
  label?: string;
  id?: string;
  value?: string;
  setChange: Dispatch<React.SetStateAction<string>>;
  style?: CSSProperties;
  labelStyle?: CSSProperties;
}

const TextArea = (
  {
    htmlFor,
    label,
    id,
    value,
    setChange,
    style,
    labelStyle
  }: TextAreaProps
) => {

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChange(e.target.value);
  }

  return (
    <>
      {label && <label style={labelStyle} htmlFor={htmlFor}>{label}</label >}
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        style={style}
        className="textArea"
      />
    </>
  );
};

export default TextArea;
