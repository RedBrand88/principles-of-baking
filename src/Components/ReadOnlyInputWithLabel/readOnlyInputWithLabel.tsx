
interface InputWithLabelProps {
    value: string;
    label?: string; 
    name?: string; 
    placeholder?: string;
    type?: string;
    id?: string;
}

const ReadOnlyInputWithLabel = ({
    label, 
    value, 
    placeholder, 
    type, 
    name,
    id
}: InputWithLabelProps) => {
    return (
        <div className="inputWithLabel">
            {label && <label htmlFor={id}>{label}</label>}
            <input 
                placeholder={placeholder} 
                value={value} 
                readOnly 
                id={id}
                name={name}
                type={type}
            />
        </div>
    );
};

export default ReadOnlyInputWithLabel;
