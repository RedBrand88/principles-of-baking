import { useState } from "react";
import Button from "../Button/button";
import "./copyPasteInputForm.css"
import { useParseRecipe } from "../../Hooks/useParseRecipe";
import RecipePreviewModal from "../RecipePreviewModal/recipePreviewModal";

const CopyPasteInputForm = () => {
  const [text, setText] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);

  const { recipe, loading, parseRecipe } = useParseRecipe();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleParse = async () => {
    await parseRecipe(text);
    setShowPreview(true);
  }

  const handleClose = () => setShowPreview(false);

  return (
    <div className="copyPasteForm">
      <textarea
        id="copyPasteTextArea"
        className="textAreaStyles"
        value={text}
        onChange={handleChange}
        placeholder="Paste your recipe here..."
      ></textarea>
      <Button
        onClick={handleParse}
        disabled={!text.trim() || loading}
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
