import { useState } from "react";
import Button from "../Button/button";
import "./copyPasteInputForm.css"
import ValidationError from "../ValidationError/validationError";
import { useParseRecipe } from "../../Hooks/useParseRecipe";
import RecipePreviewModal from "../RecipePreviewModal/recipePreviewModal";

const CopyPasteInputForm = () => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string[] | null>(null);
  const [showPreview, setShowPreview] = useState(false);

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

  const handleParse = async () => {
    await parseRecipe(text);
    setShowPreview(true);
  }

  const handleClose = () => setShowPreview(false);

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

      {showPreview && recipe && (
        <RecipePreviewModal
          recipe={recipe}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default CopyPasteInputForm;
