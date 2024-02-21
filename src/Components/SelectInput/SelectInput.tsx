import { ChangeEvent, Dispatch } from 'react';

type SelectInputProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: Dispatch<React.SetStateAction<string>>;
  htmlFor?: string;
  id?: string;
  label?: string;
}

const SelectInput = (
  {
    options,
    selectedOption,
    setSelectedOption,
    htmlFor,
    id,
    label,
  }: SelectInputProps
) => {

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <select id={id} value={selectedOption} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </>
  );
};

export default SelectInput;

