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
      className={`${type === "primary" ? "secondary" : "primary"} bottom`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      <span className={`${buttonStyle} top`}>
        {children}
      </span>
    </button>
  )
}

export default Button;
