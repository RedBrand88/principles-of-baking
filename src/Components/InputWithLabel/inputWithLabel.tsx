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
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className="border border-[#CA965C] rounded-md p-1"
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
