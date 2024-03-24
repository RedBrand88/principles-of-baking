import { ChangeEvent, useState } from "react";
import InputWithLabel from "../InputWithLabel/inputWithLabel";
import ReadOnlyInputWithLabel from "../ReadOnlyInputWithLabel/readOnlyInputWithLabel";
import Button from "../Button/button";

const CalcDoughTemp = () => {
  const [desiredDoughTemp, setDesiredDoughTemp] = useState<string>("");
  const [kitchenTemp, setKitchenTemp] = useState<string>("");
  const [flourTemp, setFlourTemp] = useState<string>("");
  const [water, setWater] = useState<string>("");

  const calcWaterTemp = () => {
    const waterTemp = ((Number(desiredDoughTemp) - 1) * 3) - Number(kitchenTemp) - Number(flourTemp)
    setWater(waterTemp.toString());
  }

  const onChangeDoughTemp = (e: ChangeEvent<HTMLInputElement>) => {
    setDesiredDoughTemp(e.target.value);
  }

  const onChangeKitchenTemp = (e: ChangeEvent<HTMLInputElement>) => {
    setKitchenTemp(e.target.value);
  }

  const onChangeFlourTemp = (e: ChangeEvent<HTMLInputElement>) => {
    setFlourTemp(e.target.value);
  }


  return (
    <div className="flex flex-col">
      <InputWithLabel
        label="Desired dough temp"
        value={desiredDoughTemp}
        onChange={onChangeDoughTemp}
        placeholder="Desired dough temp"
        id="dough-temp-input"
      />
      <InputWithLabel
        label="Ambient kitchen temp"
        value={kitchenTemp}
        onChange={onChangeKitchenTemp}
        placeholder="current kitchen temp"
        id="kitchen-temp-input"
      />
      <InputWithLabel
        label="Flour temp"
        value={flourTemp}
        onChange={onChangeFlourTemp}
        placeholder="flour temp"
        id="flour-temp-input"
      />
      <Button disabled={(desiredDoughTemp && kitchenTemp && flourTemp ? false : true)} onClick={calcWaterTemp}>
        Get required water temp
      </Button>
      <ReadOnlyInputWithLabel
        label="Water temp"
        value={water}
        id="water-temp-input"
      />
    </div>
  );
};

export default CalcDoughTemp;
