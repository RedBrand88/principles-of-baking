import { 
  densityMap, 
  IngredientDensityKey, 
  TSP_VOLUME, 
  ingredientKeyMap 
} from "../Utility/constants";

const useConvertGramsToTSP = () => {
  const getGramsPerMeasurement = (ingredient: IngredientDensityKey) => {
    return TSP_VOLUME * densityMap[ingredient];
  }

  const convertGramsToTSP = (grams: number, ingredient: string) => {
    const mappedKey = ingredientKeyMap[ingredient];

    if (!mappedKey) {
      return 0; // unknown ingredient
    }

    if (mappedKey === "scald") {
      return grams / TSP_VOLUME;
    }

    return grams / getGramsPerMeasurement(mappedKey);
  }

  return { convertGramsToTSP };
};

export default useConvertGramsToTSP;
