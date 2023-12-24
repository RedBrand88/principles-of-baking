import { useState } from "react";
import DropDown from "../DropDown/DropDown";
import Calendar from "../Calendar/Calendar";

const RecipeSchedule = () => {
    const [recipe, setRecipe] = useState<string>("");
    //TODO: remove place holder data for recipe get request
    const recipes = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" }
    ];

    const onSelectRecipe = (value: string) => {
        setRecipe(value);
    };

    return (
        <>
            <DropDown label="Recipe Selector" value={recipe} options={recipes} onChange={(e) => onSelectRecipe(e.target.value)} />
            <div>desired date to eat</div>
            <Calendar />
        </>
    );
};

export default RecipeSchedule;
