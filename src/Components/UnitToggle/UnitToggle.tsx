import { Unit } from "../../types/dto";
import "./UnitToggle.css";

type UnitToggleProps = {
  unit: Unit;
  onChange: () => void;
};

const UnitToggle = ({ unit, onChange }: UnitToggleProps) => {
  return (
    <label className="toggleWrapper" aria-label="Switch between grams and cups">
      <span className={`toggleLabel ${unit === "g" ? "toggleActive" : ""}`}>g</span>
      <div className="toggle">
        <input
          type="checkbox"
          checked={unit === "cups"}
          onChange={onChange}
        />
        <span className="slider" />
      </div>
      <span className={`toggleLabel ${unit === "cups" ? "toggleActive" : ""}`}>cups</span>
    </label>
  );
};

export default UnitToggle;
