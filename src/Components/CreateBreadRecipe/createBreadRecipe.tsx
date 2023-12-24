import { useContext, useState } from "react";
import ReadOnlyInputWithLabel from "../ReadOnlyInputWithLabel/readOnlyInputWithLabel";
import InputWithLabel from "../InputWithLabel/inputWithLabel";
import DropDown from "../DropDown/DropDown";
import { Recipe, RecipeContext } from "../../App";

const CreateBreadRecipe = () => {
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

    const getRemainingFlour = () => {
        return flour - scald;
    }

    const getRemainingMilk = () => {
        return milk - scaldLiquid;
    }

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


    const castTotalDoughToNumber = (value: string) => {
        if (value) {
            setTotalDoughInGrams(Number(value));
        }
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
        <div className="card">
            <DropDown
                label="Recipe Selector"
                value={recipeInstructions}
                options={recipeInstructionsData()}
                onChange={(e) => onSelectRecipeInstructions(e.target.value)}
            />
            <div>
                <InputWithLabel title="Total dough needed" value={totalDoughInGrams.toString()} setValue={castTotalDoughToNumber} />
                <button onClick={setRecipeFields}>
                    prepare recipe
                </button>
            </div>
            <ReadOnlyInputWithLabel title="Flour" value={scald ? getRemainingFlour().toString() : flour.toString()} placeholder="Flour in grams" />
            <ReadOnlyInputWithLabel title="Water" value={water.toString()} placeholder="water in ml" />
            <ReadOnlyInputWithLabel title="Milk" value={scaldLiquid ? getRemainingMilk().toString() : milk.toString()} placeholder="milk in ml" />
            <ReadOnlyInputWithLabel title="Yeast" value={yeast.toString()} placeholder="yeast in grams" />
            <ReadOnlyInputWithLabel title="Salt" value={salt.toString()} placeholder="salt in grams" />
            <ReadOnlyInputWithLabel title="Sugar" value={sugar.toString()} placeholder="sugar in grams" />
            <ReadOnlyInputWithLabel title="Butter" value={butter.toString()} placeholder="butter in grams" />
            <ReadOnlyInputWithLabel title="Egg" value={egg.toString()} placeholder="eggs in grams" />
            <ReadOnlyInputWithLabel title="Scald" value={scald.toString()} placeholder="flour to scald in grams" />
            <ReadOnlyInputWithLabel title="Liquid for scald" value={scaldLiquid.toString()} placeholder="liquid to boil for scald" />
        </div>
    );
};

export default CreateBreadRecipe;
