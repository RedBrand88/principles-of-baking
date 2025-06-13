import { ChangeEventHandler } from "react";
import "./DropDown.css";

interface DropDownProps {
  id?: string;
  label: string;
  value: string;
  options: any[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const DropDown = ({ id, label, value, options, onChange }: DropDownProps) => {
  return (
    <div className="dropDownContainer">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        id={id}
        className="dropDown"
      >
        {options.map((recipe) => (
          <option key={recipe.title + recipe.description} value={recipe.id}>{recipe.title}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
