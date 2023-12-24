
interface tabNavItemProps {
    id: string;
    title: string;
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const TabNavItem = ({ id, title, activeTab, setActiveTab }: tabNavItemProps) => {
    const inActive = "w-1/2 p-4 list-none text-center pointer transition-all duration-700 first:rounded-l-[2rem] last:rounded-r-[2rem] hover:bg-[#32e0c3]";
    const active = `${inActive} bg-[#39A2DB]`
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
