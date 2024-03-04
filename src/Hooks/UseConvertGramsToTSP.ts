import { densityMap } from "../Utility/constants";
import { TSP_VOLUME } from "../Utility/constants";

const useConvertGramsToTSP = () => {

  const getGramsPerMeasurement = (ingredient: string) => {
    return TSP_VOLUME * densityMap[ingredient];
  }

  const convertGramsToTSP = (grams: number, ingredient: string) => {
    if (ingredient === "flour") {
      return grams / getGramsPerMeasurement("whiteFlour");
    } else if (ingredient === "wheat flour") {
      return grams / getGramsPerMeasurement("wheatFlour");
    } else if (ingredient === "water") {
      return grams / getGramsPerMeasurement("water");
    } else if (ingredient === "milk") {
      return grams / getGramsPerMeasurement("wholeMilk");
    } else if (ingredient === "scald") {
      return grams / TSP_VOLUME;
    } else if (ingredient === "butter") {
      return grams / getGramsPerMeasurement("butter");
    } else {
      return 0;
    }
  }

  return { convertGramsToTSP };
};

export default useConvertGramsToTSP;
