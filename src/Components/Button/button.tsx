import { CSSProperties } from 'react';
import './button.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "secondary";
  disabled?: boolean;
  style?: CSSProperties;
}

const Button = ({ children, onClick, type = "primary", disabled = false, style }: ButtonProps) => {

  const buttonStyle = type === "primary" ? "primary" : "secondary";

  return (
    <button
      className={`${buttonStyle} button`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button;
