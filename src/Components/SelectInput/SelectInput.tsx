import { ChangeEvent, Dispatch } from 'react';

type SelectInputProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: Dispatch<React.SetStateAction<string>>;
}

const SelectInput = ({ options, selectedOption, setSelectedOption }: SelectInputProps) => {

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <label htmlFor="unit">Select Unit:</label>
      <select id="unit" value={selectedOption} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;

