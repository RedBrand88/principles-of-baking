import React, { ChangeEvent, Dispatch } from "react"

type TextAreaProps = {
  htmlFor?: string;
  label?: string;
  id?: string;
  value?: string;
  setChange: Dispatch<React.SetStateAction<string>>;
}

const TextArea = (
  {
    htmlFor,
    label,
    id,
    value,
    setChange
  }: TextAreaProps
) => {

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChange(e.target.value);
  }

  return (
    <>
      {label && <label htmlFor={htmlFor}>{label}</label >}
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default TextArea;
