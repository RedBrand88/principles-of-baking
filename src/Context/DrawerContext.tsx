import { createContext, useContext, useState, ReactNode } from "react";

type DrawerContextType = {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider = ({ children }: {children: ReactNode }) => {
  const [isDrawerOpen, setIsDawerOpen] = useState(false);

  const openDrawer = () => setIsDawerOpen(true);
  const closeDrawer = () => setIsDawerOpen(false);
  const toggleDrawer = () => setIsDawerOpen(prev => !prev);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, openDrawer, closeDrawer, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used within a DrawerProvider");
  return ctx
}
