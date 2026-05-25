import { YeastType } from "../../Hooks/useConvertYeast";
import "../UnitToggle/UnitToggle.css";

type YeastToggleProps = {
  yeastType: YeastType;
  onChange: () => void;
};

const YeastToggle = ({ yeastType, onChange }: YeastToggleProps) => {
  return (
    <label className="toggleWrapper" aria-label="Switch between dry yeast and sourdough">
      <span className={`toggleLabel ${yeastType === "dry" ? "toggleActive" : ""}`}>dry yeast</span>
      <div className="toggle">
        <input
          type="checkbox"
          checked={yeastType === "sourdough"}
          onChange={onChange}
        />
        <span className="slider" />
      </div>
      <span className={`toggleLabel ${yeastType === "sourdough" ? "toggleActive" : ""}`}>sourdough</span>
    </label>
  );
};

export default YeastToggle;
