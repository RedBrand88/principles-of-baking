import { useState } from "react";
import TabNavItem from "../TabNavItem/tabNavItem";
import TabContent from "../TabContent/tabContent";
import CreateBreadRecipe from "../CreateBreadRecipe/createBreadRecipe";
import CalcDoughTemp from "../CalcDoughTemp/calcDoughTemp";
import RecipeSchedule from "../RecipeSchedule/recipeSchedule";

const Tab = () => {
    const [activeTab, setActiveTab] = useState<string>("tab1");

    return (
        <div className="flex flex-col items-center bg-[#053742] py-8 px-4 text-[#E8F0F2] md:px-0" >
            <ul className="w-3/5 flex justify-between items-center border border-[#39A2DB] rounded-[2rem] md:w-9/10">
                <TabNavItem id="tab1" title="Create Bread Recipe" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem id="tab2" title="Calculate Water Temp" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabNavItem id="tab3" title="Scheduler" activeTab={activeTab} setActiveTab={setActiveTab} />
            </ul>
            <div className="outlet">
                <TabContent id="tab1" activeTab={activeTab}>
                    <CreateBreadRecipe />
                </TabContent>
                <TabContent id="tab2" activeTab={activeTab}>
                    <CalcDoughTemp />
                </TabContent>
                <TabContent id="tab3" activeTab={activeTab}>
                    <RecipeSchedule />
                </TabContent>
            </div>
        </div>
    );
};

export default Tab;
