import { ChangeEvent } from "react";

interface inputWithLabelProps {
    value: string;
    setValue: () => void;
    title: string;
    placeholder?: string;
}

const InputWithLabel = ({title, value, setValue, placeholder}: inputWithLabelProps) => {

    return (
        <div className="inputWithLabel">
            <div>{title}</div>
            <input placeholder={placeholder} onChange={setValue} value={value} />
        </div>
    );
};

export default InputWithLabel;
