import { ChangeEvent, FormEvent, useState } from "react";
import InputWithLabel from "../InputWithLabel/inputWithLabel";
import useCreateRecipe from "../../Hooks/UseCreateRecipe";
import SelectInput from "../SelectInput/SelectInput";

type recipeIngredient = {
  ingredient: string;
  measurement: number;
}

const AddBreadRecipe = () => {
  //TODO: 1. create Recipe object to send in post method createRecipe
  //      2. create form for all input elements map readonly inputs for ingredients.
  //      3. map readonly inputs for instructions.
  //      4. run small calculation to figure out bakers precentage for the recipe.
  //      5. add title input and descriptions textarea to create recipe form.
  //      6. fix type errors.
  const { createRecipe, loading, error } = useCreateRecipe();
  const measurements = ["g", "oz", "ml", "cups", "Tbls", "tsp"];

  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [addIngredient, setAddIngredient] = useState<recipeIngredient | null>({ ingredient: "", measurement: 0 });
  const [recipeIngredients, setRecipeIngredients] = useState<recipeIngredient[]>([]);
  const [measurement, setMeasurement] = useState<string>(measurements[0]);


  const addIngredientOnClick = () => {
    if (addIngredient) {
      setRecipeIngredients([...recipeIngredients, addIngredient]);
      setAddIngredient({ ingredient: "", measurement: 0 });
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        <SelectInput
          options={measurements}
          selectedOption={measurement}
          setSelectedOption={setMeasurement}
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
          recipeIngredients.map(({ ingredient, measurement }) => (
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
