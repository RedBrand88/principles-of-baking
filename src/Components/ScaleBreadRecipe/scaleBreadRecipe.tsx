import { ChangeEvent, useContext, useState } from "react";
import ReadOnlyInputWithLabel from "../ReadOnlyInputWithLabel/readOnlyInputWithLabel";
import InputWithLabel from "../InputWithLabel/inputWithLabel";
import DropDown from "../DropDown/DropDown";
import { Recipe, RecipeContext } from "../../App";
import Button from "../Button/button";
import "./scaleBreadRecipe.css";

const ScaleBreadRecipe = () => {
  //TODO: round numbers to get as close to original dough quantity as possible.
  const recipes = useContext(RecipeContext);
  const [totalDoughInGrams, setTotalDoughInGrams] = useState<number>(0);
  const [flour, setFlour] = useState<number>(0);
  const [scald, setScald] = useState<number>(0);
  const [scaldLiquid, setScaldLiquid] = useState<number>(0);
  const [water, setWater] = useState<number>(0);
  const [milk, setMilk] = useState<number>(0);
  const [yeast, setYeast] = useState<number>(0);
  const [salt, setSalt] = useState<number>(0);
  const [sugar, setSugar] = useState<number>(0);
  const [butter, setButter] = useState<number>(0);
  const [egg, setEgg] = useState<number>(0);
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [recipeInstructions, setRecipeInstructions] = useState<string>("");

  const SCALD_RATIO = 1.4;

  const getPercentageByIngredient = (ingredient: string) => {
    if (recipe && recipe.percentages.length > 0) {
      return recipe.percentages.reduce((acc, ing) => {
        if (ing.ingredientName.toLowerCase().includes(ingredient)) {
          return acc + ing.percent;
        } else {
          return acc;
        }
      }, 0) * 100;
    } else {
      return 0;
    }
  };

  const getFlour = (onePercentOfDough: number) => {
    return 100 * onePercentOfDough;
  }

  const getWater = (onePercentOfDough: number) => {
    return getPercentageByIngredient("water") * onePercentOfDough;
  }

  const getMilk = (onePercentOfDough: number) => {
    return getPercentageByIngredient("milk") * onePercentOfDough;
  }

  const getScald = (onePercentOfDough: number) => {
    return getPercentageByIngredient("scald") * onePercentOfDough;
  }

  const getScaldLiquid = (onePercentOfDough: number, liqToFlour: number) => {
    const flourToScald = getPercentageByIngredient("scald") * onePercentOfDough;
    return flourToScald * liqToFlour;
  }

  const getYeast = (onePercentOfDough: number) => {
    return getPercentageByIngredient("yeast") * onePercentOfDough;
  }

  const getSalt = (onePercentOfDough: number) => {
    return getPercentageByIngredient("salt") * onePercentOfDough;
  }

  const getSugar = (onePercentOfDough: number) => {
    return getPercentageByIngredient("sugar") * onePercentOfDough;
  }

  const getButter = (onePercentOfDough: number) => {
    return getPercentageByIngredient("butter") * onePercentOfDough;
  }

  const getEgg = (onePercentOfDough: number) => {
    return getPercentageByIngredient("egg") * onePercentOfDough;
  }

  const totalPercentages = (recipe: Recipe) => {
    return recipe.percentages.reduce((acc, percentage) => {
      if (percentage.ingredientName.toLowerCase().includes("scald") || percentage.ingredientName.toLowerCase().includes("boil")) {
        return acc;
      } else {
        return acc + percentage.percent;
      }
    }, 0) * 100;
  }

  // const getRemainingFlour = () => {
  //   return flour - scald;
  // }

  // const getRemainingMilk = () => {
  //   return milk - scaldLiquid;
  // }

  const getOnePercent = () => {
    if (recipe && recipe.percentages.length > 0) {
      const total = totalPercentages(recipe);
      return totalDoughInGrams / total;
    } else {
      return 0;
    }
  }

  const setRecipeFields = () => {
    const onePercent = getOnePercent();
    if (recipe) {
      setFlour(getFlour(onePercent));
      setWater(getWater(onePercent));
      setMilk(getMilk(onePercent));
      setYeast(getYeast(onePercent));
      setSalt(getSalt(onePercent));
      setSugar(getSugar(onePercent));
      setButter(getButter(onePercent));
      setEgg(getEgg(onePercent));
      setScald(getScald(onePercent));
      setScaldLiquid(getScaldLiquid(onePercent, SCALD_RATIO));
    }

  };

  const selectIngredientState = (ingredient: string) => {
    if (ingredient.toLowerCase().includes("flour")) {
      return flour;
    }
    if (ingredient.toLowerCase().includes("water")) {
      return water;
    }
    if (ingredient.toLowerCase().includes("milk")) {
      return milk;
    }
    if (ingredient.toLowerCase().includes("yeast")) {
      return yeast;
    }
    if (ingredient.toLowerCase().includes("salt")) {
      return salt;
    }
    if (ingredient.toLowerCase().includes("sugar")) {
      return sugar;
    }
    if (ingredient.toLowerCase().includes("butter")) {
      return butter;
    }
    if (ingredient.toLowerCase().includes("egg")) {
      return egg;
    }
    if (ingredient.toLowerCase().includes("scald")) {
      return scald;
    }
    if (ingredient.toLowerCase().includes("liquid")) {
      return scaldLiquid;
    }
  }

  const castTotalDoughToNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalDoughInGrams(Number(e.target.value));
  }

  const recipeInstructionsData = () => {
    if (recipes) {
      //TODO: remove dash to get rid of unique key warnings
      return recipes;
    }
    return [];
  };

  const onSelectRecipeInstructions = (value: string) => {
    if (recipes && recipes.length > 0) {
      const selection = recipes.filter(recipe => recipe.title === value);
      if (selection && selection.length > 0) {
        setRecipe(selection[0]);
      }
      setRecipeInstructions(value);
    }
  }

  //TODO: map through ingredients so readonly inputs are only displayed if relevent.
  return (
    <div className="scaleContainer">
      <DropDown
        label="Recipe Selector"
        value={recipeInstructions}
        options={recipeInstructionsData()}
        onChange={(e) => onSelectRecipeInstructions(e.target.value)}
      />
      <InputWithLabel
        label="Total dough needed"
        value={totalDoughInGrams.toString()}
        onChange={castTotalDoughToNumber}
        id="dough-needed"
      />
      <Button onClick={setRecipeFields}>
        prepare recipe
      </Button>
      <div className="ingredientList">
        {
          recipe && recipe.ingredients.length > 0 && recipe.ingredients.map((ingredient, index) => {
            return (
              <ReadOnlyInputWithLabel
                key={ingredient.ingredientName + index}
                label={ingredient.ingredientName}
                value={selectIngredientState(ingredient.ingredientName)?.toString() ?? ""}
                placeholder="ingredient in grams"
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default ScaleBreadRecipe;
