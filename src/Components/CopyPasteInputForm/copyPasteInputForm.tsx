import { useState } from "react";
import Button from "../Button/button";
import "./copyPasteInputForm.css"
import { useParseRecipe } from "../../Hooks/useParseRecipe";
import RecipePreviewModal from "../RecipePreviewModal/recipePreviewModal";

const CopyPasteInputForm = () => {
  const [text, setText] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [originalText, setOriginalText] = useState<string>("");

  const { recipe, loading, error, parseFailed, parseRecipe, clearError } = useParseRecipe();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (error) clearError();
  };

  const handleParse = async () => {
    const ok = await parseRecipe(text);
    if (ok) {
      setOriginalText(text);
      setText("");
      setShowPreview(true);
    }
  }

  const handleManualEntry = () => {
    setOriginalText(text);
    clearError();
    setShowPreview(true);
  };

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

      {error && (
        <div className="parseErrorBlock">
          <p className="parseErrorText">{error}</p>
          {parseFailed && (
            <button className="manualEntryBtn" onClick={handleManualEntry} type="button">
              Enter manually
            </button>
          )}
        </div>
      )}

      {showPreview && (
        <RecipePreviewModal
          recipe={recipe}
          originalText={originalText}
          onClose={handleClose}
          onSaved={() => setText("")}
        />
      )}
    </div>
  );
};

export default CopyPasteInputForm;
