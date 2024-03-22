import { ChangeEventHandler } from "react";
import { Recipe } from "../../App";

interface DropDownProps {
  id?: string;
  label: string;
  value: string;
  options: Recipe[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const DropDown = ({ id, label, value, options, onChange }: DropDownProps) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        id={id}
        className="border border-[#CA965C] rounded-md p-1"
      >
        {options.map((recipe) => (
          <option key={recipe.id} value={recipe.title}>{recipe.title}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
