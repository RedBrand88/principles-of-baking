import { 
  densityMap, 
  IngredientDensityKey, 
  CUP_VOLUME,
  ingredientKeyMap,
} from "../Utility/constants";

const useConvertGramsToCups = () => {
  const getGramsPerMeasurement = (ingredient: IngredientDensityKey) => {
    return CUP_VOLUME * densityMap[ingredient];
  };

  type IngredientName = keyof typeof ingredientKeyMap;

  const convertGramsToCups = (grams: number, ingredient: IngredientName) => {
    const mappedKey = ingredientKeyMap[ingredient];

    if (mappedKey === "scald") {
      return grams / CUP_VOLUME;
    }

    return grams / getGramsPerMeasurement(mappedKey);
  };

  return { convertGramsToCups };
};

export default useConvertGramsToCups;
