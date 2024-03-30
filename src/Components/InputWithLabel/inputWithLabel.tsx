import { ChangeEvent } from "react";
import "./inputWithLabel.css";

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
    <div className="inputContainer">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className="inputMain"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        id={id}
      />
    </div>
  );
};

export default InputWithLabel;
