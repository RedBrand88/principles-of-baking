import { ChangeEvent, useState } from "react";
import InputWithLabel from "../InputWithLabel/inputWithLabel";

type recipeIngredient = {
    ingredient: string;
    measurement: number;
}

const AddBreadRecipe = () => {
    const [recipeTitle, setRecipeTitle] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [addIngredient, setAddIngredient] = useState<recipeIngredient | null>({ingredient: "", measurement: 0});
    const [recipeIngredients, setRecipeIngredients] = useState<recipeIngredient[]>([]);

    const addIngredientOnClick = () => {
        if (addIngredient) {
            setRecipeIngredients([...recipeIngredients, addIngredient]);
            setAddIngredient({ingredient: "", measurement: 0});
        }
    }

    const onChangeRecipeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setRecipeTitle(e.target.value);
    }

    const onChangeRecipeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setRecipeDescription(e.target.value);
    }

    const onChangeIngredient = (e: ChangeEvent<HTMLInputElement>) => {
        setAddIngredient({
            ...addIngredient,
            ingredient: e.target.value
        });
    }

    const onChangeMeasurement = (e: ChangeEvent<HTMLInputElement>) => {
        setAddIngredient({
            ...addIngredient,
            measurement: Number(e.target.value)
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <InputWithLabel 
                label="Title" 
                value={recipeTitle} 
                onChange={onChangeRecipeTitle} 
                id="recipe-title-input"
            />           
            <InputWithLabel 
                label="Description" 
                value={recipeDescription} 
                onChange={onChangeRecipeDescription} 
                id="recipe-description-input"
            />           
            <div className="flex">
                <InputWithLabel 
                    label="Add Ingredient" 
                    value={addIngredient?.ingredient ? addIngredient.ingredient : ''} 
                    onChange={onChangeIngredient} 
                    id="ingredient-name"
                />           
                <InputWithLabel 
                    label="measurement" 
                    value={addIngredient?.measurement ? addIngredient.measurement.toString() : '0'} 
                    onChange={onChangeMeasurement} 
                    id="ingredient-qty"
                />           
                <button 
                    className="h-47px p-1 bg-stone-500 self-end"
                    onClick={addIngredientOnClick}
                >
                    Add
                </button>
            </div>
            <div>
                {
                    recipeIngredients.map(({ingredient, measurement}) => (
                        <div key={ingredient + measurement} className="flex">
                            <div>{ingredient}</div>
                            <div>{measurement}</div>
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
