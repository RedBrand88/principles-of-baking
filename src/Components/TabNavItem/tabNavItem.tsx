import "./tabNavItem.css";

interface tabNavItemProps {
    id: string;
    title: string;
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const TabNavItem = ({ id, title, activeTab, setActiveTab }: tabNavItemProps) => {
    const handleClick = () => {
        setActiveTab(id)
    }

    return (
        <li onClick={handleClick} className={activeTab === id ? "active selector" : "inactive selector"}>
            { title }
        </li >
    );
};

export default TabNavItem;
