import { useState } from "react";
import Button from "../Button/button";
import "./copyPasteInputForm.css"

type CopyPasteInputFormProps = {
  //add props here
};
const CopyPasteInputForm = ({ }: CopyPasteInputFormProps) => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const validateText = (text: string) => {
    if (!text.includes("# Title")) return "Missing # Title header";
    if (!text.includes("# Description")) return "Missing # Description header";
    if (!text.includes("# Ingredients")) return "Missing # Ingredients header";
    if (!text.includes("# Instructions")) return "Missing # Instructions header";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setError(validateText(value))
  };

  return (
    <div className="copyPasteForm">
      <textarea
        className="textAreaStyles"
        value={text}
        onChange={handleChange}
        placeholder="Paste your recipe here..."
      ></textarea>
      {error && <p className="errorText">{error}</p>}
      <Button 
        onClick={() => console.log("clicked")}
        disabled={!!error || !text.trim()}
      >
        Parse
      </Button>
    </div>
  );
};

export default CopyPasteInputForm;
