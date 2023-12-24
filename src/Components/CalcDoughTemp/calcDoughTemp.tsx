import { useState } from "react";
import InputWithLabel from "../InputWithLabel/inputWithLabel";
import ReadOnlyInputWithLabel from "../ReadOnlyInputWithLabel/readOnlyInputWithLabel";

const CalcDoughTemp = () => {
    const [desiredDoughTemp, setDesiredDoughTemp] = useState<string>("");
    const [kitchenTemp, setKitchenTemp] = useState<string>("");
    const [flourTemp, setFlourTemp] = useState<string>("");
    const [water, setWater] = useState<string>("");

    const calcWaterTemp = () => {
        const waterTemp = ((Number(desiredDoughTemp) - 1) * 3) - Number(kitchenTemp) - Number(flourTemp)
        setWater(waterTemp.toString());
    }

    return (
        <div>
            <InputWithLabel title="Desired dough temp" value={desiredDoughTemp} setValue={setDesiredDoughTemp} placeholder="Desired dough temp" />
            <InputWithLabel title="Ambient kitchen temp" value={kitchenTemp} setValue={setKitchenTemp} placeholder="current kitchen temp" />
            <InputWithLabel title="Flour temp" value={flourTemp} setValue={setFlourTemp} placeholder="flour temp" />
            <ReadOnlyInputWithLabel title="Water temp" value={water} />
            <button onClick={calcWaterTemp} disabled={(desiredDoughTemp && kitchenTemp && flourTemp ? false : true)}>
                Get required water temp
            </button>
        </div>
    );
};

export default CalcDoughTemp;
