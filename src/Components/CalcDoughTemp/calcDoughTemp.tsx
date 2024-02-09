import { ChangeEvent, useState } from "react";
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
        <div>
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
            <button onClick={calcWaterTemp} disabled={(desiredDoughTemp && kitchenTemp && flourTemp ? false : true)}>
                Get required water temp
            </button>
            <ReadOnlyInputWithLabel 
                label="Water temp" 
                value={water} 
                id="water-temp-input"
            />
        </div>
    );
};

export default CalcDoughTemp;
