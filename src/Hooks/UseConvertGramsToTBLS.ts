import { 
  densityMap, 
  IngredientDensityKey, 
  TBLS_VOLUME, 
  ingredientKeyMap 
} from "../Utility/constants";

const useConvertGramsToTBLS = () => {
  const getGramsPerMeasurement = (ingredient: IngredientDensityKey) => {
    return TBLS_VOLUME * densityMap[ingredient];
  }

  const convertGramsToTBLS = (grams: number, ingredient: string) => {
    const mappedKey = ingredientKeyMap[ingredient];

    if (!mappedKey) {
      return 0; // unknown ingredient
    }

    if (mappedKey === "scald") {
      return grams / TBLS_VOLUME;
    }

    return grams / getGramsPerMeasurement(mappedKey);
  }

  return { convertGramsToTBLS };
}

export default useConvertGramsToTBLS;
