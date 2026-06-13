import { PropsWithChildren } from "react";

interface tabContentProps {
  id: string;
  activeTab: string;
}

const TabContent = ({ id, activeTab, children }: PropsWithChildren<tabContentProps>) => {
  return (
    <div style={{ display: activeTab === id ? "contents" : "none" }}>
      {children}
    </div>
  );
};

export default TabContent;
