type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "secondary";
  disabled?: boolean;
}

const Button = ({ children, onClick, type = "primary", disabled = false }: ButtonProps) => {

  const buttonStyle = type === "primary" ? "bg-[#876445]" : "bg-[#CA965C]";

  return (
    <button
      className={`${buttonStyle} rounded-[10px] p-1.5`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;
