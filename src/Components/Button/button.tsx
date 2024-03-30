import './button.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "secondary";
  disabled?: boolean;
}

const Button = ({ children, onClick, type = "primary", disabled = false }: ButtonProps) => {

  const buttonStyle = type === "primary" ? "primary" : "secondary";

  return (
    <button
      className={`${buttonStyle} button`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;
