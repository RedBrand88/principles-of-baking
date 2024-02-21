import { ChangeEvent } from "react";

interface inputWithLabelProps {
  value: string;
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

const InputWithLabel = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  name,
  id
}: inputWithLabelProps) => {

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        id={id}
      />
    </>
  );
};

export default InputWithLabel;
