import { createContext, useContext, useState, ReactNode } from "react";

type DrawerContextType = {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  isRecipeDrawerOpen: boolean;
  openRecipeDrawer: () => void;
  closeRecipeDrawer: () => void;
  toggleRecipeDrawer: () => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider = ({ children }: {children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRecipeDrawerOpen, setIsRecipeDrawerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("tab1");

  const openDrawer = () => {
    setIsRecipeDrawerOpen(false);
    setIsDrawerOpen(true);
  }
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  const openRecipeDrawer = () => {
    setIsDrawerOpen(false);
    setIsRecipeDrawerOpen(true);
  }
  const closeRecipeDrawer = () => setIsRecipeDrawerOpen(false);
  const toggleRecipeDrawer = () => setIsRecipeDrawerOpen(prev => !prev);

  return (
    <DrawerContext.Provider value={{ 
      isDrawerOpen, 
      openDrawer, 
      closeDrawer, 
      toggleDrawer, 
      isRecipeDrawerOpen,  
      openRecipeDrawer,
      closeRecipeDrawer,
      toggleRecipeDrawer,
      selectedId,
      setSelectedId,
      activeTab,
      setActiveTab
    }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used within a DrawerProvider");
  return ctx
}
