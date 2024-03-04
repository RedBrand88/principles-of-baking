import { densityMap } from "../Utility/constants";
import { CUP_VOLUME } from "../Utility/constants";

const useConvertGramsToCups = () => {

  const getGramsPerMeasurement = (ingredient: string) => {
    return CUP_VOLUME * densityMap[ingredient];
  }

  const convertGramsToCups = (grams: number, ingredient: string) => {
    if (ingredient === "flour") {
      return grams / getGramsPerMeasurement("whiteFlour");
    } else if (ingredient === "wheat flour") {
      return grams / getGramsPerMeasurement("wheatFlour");
    } else if (ingredient === "water") {
      return grams / getGramsPerMeasurement("water");
    } else if (ingredient === "milk") {
      return grams / getGramsPerMeasurement("wholeMilk");
    } else if (ingredient === "scald") {
      return grams / 240;
    } else if (ingredient === "butter") {
      return grams / getGramsPerMeasurement("butter");
    } else {
      return 0;
    }
  }
  return { convertGramsToCups };
};

export default useConvertGramsToCups;
