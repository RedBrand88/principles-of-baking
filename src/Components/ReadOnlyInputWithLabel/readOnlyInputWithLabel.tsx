
interface InputWithLabelProps {
    value: string;
    title: string;
    placeholder?: string;
}

const ReadOnlyInputWithLabel = ({value, title, placeholder}: InputWithLabelProps) => {
    return (
        <div className="inputWithLabel">
            <div>{title}</div>
            <input placeholder={placeholder} value={value} readOnly />
        </div>
    );
};

export default ReadOnlyInputWithLabel;
