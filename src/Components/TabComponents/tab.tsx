import { useState } from "react";
import TabNavItem from "../TabNavItem/tabNavItem";
import TabContent from "../TabContent/tabContent";
import ScaleBreadRecipe from "../ScaleBreadRecipe/scaleBreadRecipe";
import CalcDoughTemp from "../CalcDoughTemp/calcDoughTemp";
import RecipeSchedule from "../RecipeSchedule/recipeSchedule";
import AddBreadRecipe from "../AddBreadRecipe/addBreadRecipe";

const Tab = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");

  return (
    <div className="flex flex-col h-screen items-center bg-[#46484A] px-4 text-[#F4DFBA] md:px-0 pt-[82px]" >
      <ul className="w-3/5 flex justify-between bg-[#876445] items-center rounded-[10px] md:w-9/10">
        <TabNavItem id="tab1" title="Scale Bread Recipe" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem id="tab2" title="Calculate Water Temp" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem id="tab3" title="Scheduler" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabNavItem id="tab4" title="Add Recipe" activeTab={activeTab} setActiveTab={setActiveTab} />
      </ul>
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
          <ScaleBreadRecipe />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <CalcDoughTemp />
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <RecipeSchedule />
        </TabContent>
        <TabContent id="tab4" activeTab={activeTab}>
          <AddBreadRecipe />
        </TabContent>
      </div>
    </div>
  );
};

export default Tab;
