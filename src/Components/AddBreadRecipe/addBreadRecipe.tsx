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

    const onChangeIngredient = (e: ChangeEvent<HTMLInputElement>) => {
        return () => setAddIngredient({
            ...addIngredient,
            ingredient: e.target.value
        });
    }

    const onChangeMeasurement = (e: ChangeEvent<HTMLInputElement>) => {
        return () => setAddIngredient({
            ...addIngredient,
            measurement: Number(e.target.value)
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <InputWithLabel title="Title" value={recipeTitle} setValue={setRecipeTitle} />           
            <InputWithLabel title="Description" value={recipeDescription} setValue={setRecipeDescription} />           
            <div className="flex">
                <InputWithLabel 
                    title="Add Ingredient" 
                    value={addIngredient?.ingredient ? addIngredient.ingredient : ''} 
                    setValue={onChangeIngredient} 
                />           
                <InputWithLabel 
                    title="measurement" 
                    value={addIngredient?.measurement ? addIngredient.measurement.toString() : '0'} 
                    setValue={onChangeMeasurement} 
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
                        <div className="flex">
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
