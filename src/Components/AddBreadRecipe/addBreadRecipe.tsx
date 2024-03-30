import { ChangeEvent, useState } from "react";
import InputWithLabel from "../InputWithLabel/inputWithLabel";
import useCreateRecipe from "../../Hooks/UseCreateRecipe";
import Dropdown from "../Dropdown/Dropdown";
import { Recipe, Ingredient } from "../../App";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/button";

const AddBreadRecipe = () => {
  //      TODO
  //      2. create form for all input elements map readonly inputs for ingredients.
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
    createRecipe(newRecipe);
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
        <Dropdown
          label="Select Unit: "
          value={unit}
          options={units}
          onChange={(e) => setUnit(e.target.value)}
          id="unit"
        />
        <Button
          onClick={addIngredientOnClick}
        >
          Add
        </Button>
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
        <Button
          onClick={addInstructionOnClick}
        >
          Add
        </Button>
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
      <Button onClick={onSubmit}>
        Submit
      </Button>
    </div >
  )
}

export default AddBreadRecipe;
