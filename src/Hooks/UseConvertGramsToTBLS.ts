import { TBLS_VOLUME } from "../Utility/constants";
import { densityMap } from "../Utility/constants";

const useConvertGramsToTBLS = () => {

  const getGramsPerMeasurement = (ingredient: string) => {
    return TBLS_VOLUME * densityMap[ingredient];
  }

  const convertGramsToTBLS = (grams: number, ingredient: string) => {
    if (ingredient === "flour") {
      return grams / getGramsPerMeasurement("whiteFlour");
    } else if (ingredient === "wheat flour") {
      return grams / getGramsPerMeasurement("wheatFlour");
    } else if (ingredient === "water") {
      return grams / getGramsPerMeasurement("water");
    } else if (ingredient === "milk") {
      return grams / getGramsPerMeasurement("wholeMilk");
    } else if (ingredient === "scald") {
      return grams / TBLS_VOLUME;
    } else if (ingredient === "butter") {
      return grams / getGramsPerMeasurement("butter");
    } else {
      return 0;
    }
  }

  return { convertGramsToTBLS };
}

export default useConvertGramsToTBLS;
