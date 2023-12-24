
interface inputWithLabelProps {
    value: string;
    setValue: (value: string) => void;
    title: string;
    placeholder?: string;
}

const InputWithLabel = ({title, value, setValue, placeholder}: inputWithLabelProps) => {

    return (
        <div className="inputWithLabel">
            <div>{title}</div>
            <input placeholder={placeholder} onChange={(e) => setValue(e.target.value)} value={value} />
        </div>
    );
};

export default InputWithLabel;
