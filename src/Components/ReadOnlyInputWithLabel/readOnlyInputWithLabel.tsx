
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
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        placeholder={placeholder}
        value={value}
        readOnly
        id={id}
        name={name}
        type={type}
      />
    </>
  );
};

export default ReadOnlyInputWithLabel;
