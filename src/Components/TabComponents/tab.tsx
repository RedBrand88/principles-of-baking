import { useState } from "react";
import TabNavItem from "../TabNavItem/tabNavItem";
import TabContent from "../TabContent/tabContent";
import ScaleBreadRecipe from "../ScaleBreadRecipe/scaleBreadRecipe";
import CalcDoughTemp from "../CalcDoughTemp/calcDoughTemp";
import RecipeSchedule from "../RecipeSchedule/recipeSchedule";
// import AddBreadRecipe from "../AddBreadRecipe/addBreadRecipe";
import "./tab.css";
import { useAuth } from "../../Context/AuthContext";
import CopyPasteInputForm from "../CopyPasteInputForm/copyPasteInputForm";
import RecipeExplorer from "../RecipeExplorer/recipeExplorer";

const Tab = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const { user } = useAuth();

  return (
    <div className="tabContainer" >
      <div role="tablist" aria-label="Bread recipe tools" className="tabs">
        <TabNavItem id="tab1" title="Explore Recipes" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem id="tab2" title="Scale Bread Recipe" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem id="tab3" title="Calculate Water Temp" activeTab={activeTab} setActiveTab={setActiveTab} />
        {user && <TabNavItem id="tab4" title="Scheduler" activeTab={activeTab} setActiveTab={setActiveTab} />}
        {user && <TabNavItem id="tab5" title="Add Recipe" activeTab={activeTab} setActiveTab={setActiveTab} />}
      </div>
      <div className="layout">
        <TabContent id="tab1" activeTab={activeTab}>
          <RecipeExplorer />        
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <ScaleBreadRecipe />
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <CalcDoughTemp />
        </TabContent>
        {user && 
          <TabContent id="tab4" activeTab={activeTab}>
            <RecipeSchedule />
          </TabContent>
        }
        {user &&
          <TabContent id="tab5" activeTab={activeTab}>
            <CopyPasteInputForm />
          </TabContent>
        }
      </div>
    </div>
  );
};

export default Tab;
