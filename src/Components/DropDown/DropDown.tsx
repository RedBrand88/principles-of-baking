import React, { ChangeEventHandler } from "react";
import { Recipe } from "../../App";

interface DropDownProps {
    label: string;
    value: string;
    options: Recipe[];
    onChange: ChangeEventHandler<HTMLSelectElement>;
}

const DropDown = ({ label, value, options, onChange }: DropDownProps) => {
    return (
        <label>
            {label}
            <select value={value} onChange={onChange}>
                {options.map((recipe) => (
                    <option key={recipe.id} value={recipe.title}>{recipe.title}</option>
                ))}
            </select>
        </label>
    );
};

export default DropDown;
