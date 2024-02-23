import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import InputWithLabel from "../InputWithLabel/inputWithLabel";
import useCreateRecipe from "../../Hooks/UseCreateRecipe";
import SelectInput from "../SelectInput/SelectInput";
import { Recipe, Ingredient } from "../../App";
import TextArea from "../TextArea/TextArea";

const AddBreadRecipe = () => {
  //TODO: 1. create Recipe object to send in post method createRecipe ✅
  //      2. create form for all input elements map readonly inputs for ingredients.
  //      3. map readonly inputs for instructions. ✅
  //      4. run small calculation to figure out bakers precentage for the recipe. ✅
  //      5. add title input and descriptions textarea to create recipe form. ✅
  //      6. fix type errors. ✅
  const { createRecipe, loading, error } = useCreateRecipe();
  const units = ["g", "oz", "ml", "cups", "Tbls", "tsp"];

  const [instructionCount, setInstructionCount] = useState(1);
  const [unit, setUnit] = useState<string>(units[0]);
  const [addIngredient, setAddIngredient] = useState<Ingredient>({ ingredientName: "", quantity: 0, unit: unit });
  const [addInstruction, setAddInstruction] = useState<string>("");
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    id: "",
    title: "",
    description: "",
    ingredients: [],
    instructions: [],
    percentages: [],
  });

  const addIngredientOnClick = () => {
    if (addIngredient) {
      setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, addIngredient] });
      setAddIngredient({ ingredientName: "", quantity: 0, unit: unit });
    }
  }

  const onChangeRecipeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRecipe({ ...newRecipe, title: e.target.value });
  }

  const onChangeRecipeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRecipe({ ...newRecipe, description: e.target.value });
  }

  const onChangeIngredientName = (e: ChangeEvent<HTMLInputElement>) => {
    setAddIngredient({
      ...addIngredient,
      ingredientName: e.target.value
    });
  }

  const onChangeMeasurement = (e: ChangeEvent<HTMLInputElement>) => {
    setAddIngredient({
      ...addIngredient,
      quantity: Number(e.target.value)
    })
  }

  const onSubmit = () => {
    console.log(newRecipe);
  }

  const addInstructionOnClick = () => {
    setNewRecipe({ ...newRecipe, instructions: [...newRecipe.instructions, `${instructionCount}. ${addInstruction}`] });
    setInstructionCount(instructionCount + 1);
    setAddInstruction("");
  }

  return (
    <div className="flex flex-col gap-4">
      <InputWithLabel
        label="Title"
        value={newRecipe?.title ? newRecipe.title : ""}
        onChange={onChangeRecipeTitle}
        id="recipe-title-input"
      />
      <InputWithLabel
        label="Description"
        value={newRecipe?.description ? newRecipe.description : ""}
        onChange={onChangeRecipeDescription}
        id="recipe-description-input"
      />
      <div className="flex">
        <InputWithLabel
          label="Add Ingredient"
          value={addIngredient?.ingredientName ? addIngredient.ingredientName : ""}
          onChange={onChangeIngredientName}
          id="ingredient-name"
        />
        <InputWithLabel
          label="measurement"
          value={addIngredient.quantity ? addIngredient.quantity.toString() : '0'}
          onChange={onChangeMeasurement}
          id="ingredient-qty"
        />
        <SelectInput
          options={units}
          selectedOption={unit}
          setSelectedOption={setUnit}
          htmlFor="unit"
          id="unit"
          label="Select Unit: "
        />
        <button
          className="h-47px p-1 bg-stone-500 self-end"
          onClick={addIngredientOnClick}
        >
          Add
        </button>
      </div>
      <div>
        <div>{`${instructionCount}.`}</div>
        <TextArea
          id="add-instruction"
          htmlFor="add-instructions"
          label="Add Instruction"
          value={addInstruction}
          setChange={setAddInstruction}
        />
        <button
          onClick={addInstructionOnClick}
        >
          Add
        </button>
      </div>
      <div>
        {
          newRecipe?.ingredients.map(({ ingredientName, quantity, unit }) => (
            <div key={ingredientName + quantity} className="flex">
              <div>{`${ingredientName}: ` + quantity.toString() + unit}</div>
            </div>
          ))
        }
        {
          newRecipe?.instructions.map((instruction, index) => (
            <div key={instruction + index} className="flex">
              <div>{instruction}</div>
            </div>
          ))
        }
      </div>
      <button onClick={onSubmit}>
        Submit
      </button>
    </div >
  )
}

export default AddBreadRecipe;
