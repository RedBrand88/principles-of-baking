import { useState } from "react";
import Button from "../Button/button";
import "./copyPasteInputForm.css"
import ValidationError from "../ValidationError/validationError";
import { useParseRecipe } from "../../Hooks/useParseRecipe";

type CopyPasteInputFormProps = {
  //add props here
};
const CopyPasteInputForm = ({ }: CopyPasteInputFormProps) => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string[] | null>(null);

  const { recipe, loading, parseRecipe } = useParseRecipe();

  const validateText = (text: string) => {
    const recipeError = [];
    if (!text.includes("# Title")) recipeError.push("Missing # Title header");
    if (!text.includes("# Description")) recipeError.push("Missing # Description header");
    if (!text.includes("# Ingredients")) recipeError.push("Missing # Ingredients header");
    if (!text.includes("# Instructions")) recipeError.push("Missing # Instructions header");
    return recipeError;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    setError(validateText(value))
  };

  const handleParse = () => {
    parseRecipe(text);
  }

  return (
    <div className="copyPasteForm">
      <textarea
        className="textAreaStyles"
        value={text}
        onChange={handleChange}
        placeholder="Paste your recipe here..."
      ></textarea>
      <ValidationError errors={error} />
      <Button
        onClick={handleParse}
        disabled={(error && error.length > 0) || !text.trim() || loading}
      >
        {loading ? "Parsing..." : "Parse"}
      </Button>
      {recipe && (
        <pre className="parsedJson">
          {JSON.stringify(recipe, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default CopyPasteInputForm;
