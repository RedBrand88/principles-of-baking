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
    <div className="flex flex-col h-screen items-center bg-[#46484A] px-4 text-[#F4DFBA] md:px-0" >
      <div className="h-10 w-screen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="38" width="38"><path d="M423.618 21.333C356.572 21.333 256 64 149.333 170.667L128 192c0 64-42.667 64-42.667 64-36.978 56.295-64 114.881-64 170.667 0 0 0 64 67.049 64 67.046 0 142.22-42.667 231.618-128 55.872-53.334 170.667-192 170.667-277.334 0 0 0-64-67.049-64z" style={{ fill: '#ad6143' }} /><path d="M376.33 71.67c-27.855-27.855-123.41 22.54-213.432 112.562a720.602 720.602 0 0 0-42.273 46.129 46.297 46.297 0 0 1-14.7 18.132c-52.528 67.422-76.808 127.951-55.59 149.17 27.856 27.854 123.412-22.542 213.433-112.561C353.79 195.08 404.185 99.523 376.331 71.669z" style={{ fill: '#a34e2d' }} /><path d="M88.375 490.667V448c54.146 0 120.27-38 202.167-116.208C356.292 269.042 448 144.917 448 85.333h42.667c0 85.625-117.209 226.292-170.667 277.334-90.208 86.125-165.98 128-231.625 128z" style={{ fill: '#c28a73' }} /><path d="m319.042 197.375-20.709-5.042c1.021-4.229-.146-7.833-3.583-11.062-4.208-3.958-16.042-10.604-47.896-10.604-23.354 0-51.583 3.666-79.5 10.354l-4.958-20.75c29.479-7.063 59.479-10.938 84.458-10.938 30.313 0 50.771 5.354 62.5 16.396 9.021 8.458 12.542 20 9.688 31.646z" style={{ fill: '#993b17' }} /><path d="M116.563 277.188a188.253 188.253 0 0 1-25.667-1.605l2.958-21.125c28.813 3.959 75.354-1.062 117.438-12.979l5.791 20.542c-34.145 9.646-70.791 15.166-100.52 15.166z" style={{ fill: '#ad6143' }} /><path d="M151.374 185.185a365.662 365.662 0 0 0-23.401 7.462c-.218 45.177-21.77 58.106-34.144 61.813 28.452 3.907 73.174-.459 117.464-12.98 62.637-17.708 100-44.665 83.454-60.21s-80.735-13.793-143.373 3.915z" style={{ fill: '#fdcf6d' }} /><path d="m141.75 210.458-6.708-20.25c5.229-1.729 10.687-3.437 16.354-5.02 32.625-9.23 67.417-14.521 95.458-14.521 13.688 0 38.104 1.375 47.896 10.604l-14.625 15.542c-.042 0-7.25-4.813-33.27-4.813-26.167 0-58.855 5-89.688 13.73a331.285 331.285 0 0 0-15.417 4.728z" style={{ fill: '#fdab00' }} /><path d="m62.042 350.48-10.834-18.376c22.813-13.416 55.313-23.187 78.125-27.875 17.917-3.646 35.063-5.562 49.625-5.562 24.375 0 40.48 5.208 49.188 15.937l-16.583 13.459c-1.959-2.438-9.063-8.063-32.605-8.063-13.166 0-28.833 1.77-45.354 5.146-20.146 4.125-51 13.229-71.562 25.333z" style={{ fill: '#993b17' }} /><path d="M77.042 405.333c-24.375 0-40.48-5.208-49.188-15.937l16.584-13.459C46.395 378.375 53.5 384 77.041 384c13.166 0 28.833-1.77 45.354-5.146 40.937-8.375 87.27-27.687 90.75-44.25l20.875 4.375c-8.25 39.375-97.23 58.709-107.354 60.792-17.917 3.646-35.063 5.562-49.625 5.562z" style={{ fill: '#b7745a' }} /><ellipse cx="128" cy="352" rx="87.645" ry="24.966" transform="rotate(-13.78 128 352)" style={{ fill: '#fdcf6d' }} /><path d="M62.813 376.146 45.291 364c8.104-11.73 41.833-29.333 88.333-38.854 16.48-3.354 32.146-5.146 45.333-5.146 15.334 0 23.459 2.354 27.584 4.313l-9.209 19.25c-.187-.084-4.812-2.23-18.375-2.23-11.77 0-25.958 1.625-41.041 4.73-47.25 9.645-72.23 26.25-75.105 30.083z" style={{ fill: '#fdab00' }} /><path d="M447.354 61.646 426.48 57.27a7.478 7.478 0 0 0-1.562-6.521c-2.938-3.625-9.938-6.25-19.688-7.417l2.5-21.166c15.98 1.875 27 6.812 33.73 15.104a28.618 28.618 0 0 1 5.895 24.375z" style={{ fill: '#a34e2d' }} /><path d="M290.375 128c-24.375 0-40.48-5.208-49.188-15.938l16.584-13.458c1.958 2.438 9.062 8.063 32.604 8.063 13.167 0 28.833-1.771 45.354-5.146l4.25 20.916c-17.896 3.646-35.041 5.563-49.604 5.563z" style={{ fill: '#ad6143' }} /><ellipse cx="341.333" cy="74.667" rx="87.645" ry="24.966" transform="rotate(-13.78 341.333 74.667)" style={{ fill: '#fdcf6d' }} /><path d="m276.146 98.813-17.521-12.146c8.104-11.73 41.833-29.334 88.333-38.855 16.48-3.354 32.146-5.145 45.334-5.145 15.333 0 23.458 2.354 27.583 4.312l-9.208 19.25c-.188-.083-4.813-2.229-18.375-2.229-11.771 0-25.959 1.625-41.042 4.73-47.25 9.645-72.23 26.25-75.104 30.082z" style={{ fill: '#fdab00' }} /><ellipse cx="373.333" cy="138.667" rx="32" ry="10.667" style={{ fill: '#a34e2d' }} /><ellipse cx="309.333" cy="256" rx="32" ry="21.333" style={{ fill: '#a34e2d' }} /><ellipse cx="74.667" cy="448" rx="32" ry="21.333" style={{ fill: '#c28a73' }} /><circle cx="448" cy="85.333" r="21.333" style={{ fill: '#c28a73' }} /><ellipse cx="416" cy="170.667" rx="32" ry="21.333" style={{ fill: '#a34e2d' }} /><ellipse cx="277.333" cy="330.667" rx="21.333" ry="10.667" style={{ fill: '#a34e2d' }} /><ellipse cx="106.667" cy="405.333" rx="42.667" ry="21.333" style={{ fill: '#b7745a' }} /><ellipse cx="256" cy="266.667" rx="21.333" ry="10.667" style={{ fill: '#993b17' }} /><ellipse cx="202.667" cy="298.667" rx="32" ry="21.333" style={{ fill: '#993b17' }} /><ellipse cx="320" cy="160" rx="21.333" ry="10.667" style={{ fill: '#993b17' }} /><ellipse cx="341.333" cy="202.667" rx="21.333" ry="10.667" style={{ fill: '#a34e2d' }} /></svg>
      </div>
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
