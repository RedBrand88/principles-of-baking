import { useState } from "react";
import InputWithLabel from "../InputWithLabel/inputWithLabel";


const AddBreadRecipe = () => {
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [addIngredient, setAddIngredient] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState<string[]>([]);

    const addIngredientOnClick = () => {
        setRecipeIngredients([...recipeIngredients, addIngredient]);
        setAddIngredient('');
    }

    return (
        <div>
            <InputWithLabel title="Title" value={recipeTitle} setValue={setRecipeTitle} />           
            <InputWithLabel title="Description" value={recipeDescription} setValue={setRecipeDescription} />           
            <InputWithLabel title="Add Ingredient" value={addIngredient} setValue={setAddIngredient} />           
            <button onClick={addIngredientOnClick}>
                Add
            </button>
            <div>
                {
                    recipeIngredients.map((ingredient: string) => (
                        <div>
                            {ingredient}
                        </div>
                    ))
                }
            </div>
            <button onClick={() => console.log("submit new recipe")}>
                Submit
            </button>
        </div>
    )
}

export default AddBreadRecipe;
