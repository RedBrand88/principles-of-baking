import { ChangeEvent, useState } from "react";
import InputWithLabel from "../InputWithLabel/inputWithLabel";
import useCreateRecipe from "../../Hooks/UseCreateRecipe";
import Dropdown from "../DropDown/DropDown";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/button";
import { useToast } from "../../Hooks/useToast";
import "./addBreadRecipe.css";
import { 
  UNITS, 
  type Unit, 
  type IngredientDraft, 
  type RecipeRequest 
} from "../../types/dto";

const AddBreadRecipe = () => {
  const { createRecipe, loading } = useCreateRecipe();
  const { addToast } = useToast();

  const [instructionCount, setInstructionCount] = useState(1);
  const [unit, setUnit] = useState<Unit>(UNITS[0]);
  const [addIngredient, setAddIngredient] = useState<IngredientDraft>({ ingredientName: "", quantity: 0, unit: unit });
  const [addInstruction, setAddInstruction] = useState<string>("");
  const [newRecipe, setNewRecipe] = useState<RecipeRequest>({
    title: "",
    description: "",
    ingredients: [],
    instructions: [],
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

  const onSubmit = async () => {
    const success = await createRecipe(newRecipe);
    if (success) {
      addToast("Recipe created successfully!", "success");
    } else {
      addToast("Failed to create recipe. Please try again.", "error");
    }
  }

  const addInstructionOnClick = () => {
    setNewRecipe({ ...newRecipe, instructions: [...newRecipe.instructions, `${instructionCount}. ${addInstruction}`] });
    setInstructionCount(instructionCount + 1);
    setAddInstruction("");
  }

  return (
    <div className="addRecipeContainer">
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
          options={UNITS}
          onChange={(e) => setUnit(e.target.value)}
          id="unit"
        />
        <Button
          onClick={addIngredientOnClick}
        >
          Add
        </Button>
      </div>
      <div className="flex">
        <div className="alignSelfFlexStart">{`${instructionCount}.`}</div>
        <TextArea
          id="add-instruction"
          htmlFor="add-instructions"
          label="Add Instruction"
          value={addInstruction}
          setChange={setAddInstruction}
          labelStyle={{ alignSelf: "flex-start"}}
          style={{width: "490px", height: "180px"}}
        />
        <Button
          style={{ alignSelf: "flex-start"}}
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
      <Button style={{alignSelf: "flex-start"}} onClick={onSubmit} disabled={loading}>
        { loading ? "Sending" : "Submit" }
      </Button>
    </div >
  )
}

export default AddBreadRecipe;
