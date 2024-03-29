import { PropsWithChildren } from "react";

interface tabContentProps {
    id: string;
    activeTab: string;
}

const TabContent = ({id, activeTab, children}: PropsWithChildren<tabContentProps>) => {
    return (
        activeTab === id ? <div>
            {children}
        </div>
            : null
    );
};

export default TabContent;
