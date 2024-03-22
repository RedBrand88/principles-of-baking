
interface tabNavItemProps {
    id: string;
    title: string;
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const TabNavItem = ({ id, title, activeTab, setActiveTab }: tabNavItemProps) => {
    const inActive = "w-1/2 p-4 list-none text-center pointer transition-all duration-700 first:rounded-l-[10px] last:rounded-r-[10px] hover:bg-[#CA965C]";
    const active = `${inActive} bg-[#CA965C]`
    const handleClick = () => {
        setActiveTab(id)
    }

    return (
        <li onClick={handleClick} className={activeTab === id ? `${active}` : `${inActive}`}>
            { title }
        </li >
    );
};

export default TabNavItem;
