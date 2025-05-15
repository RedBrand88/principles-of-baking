import { useEffect } from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
  type?: "success" | "error" | "info" | "warning";
}

export const Toast = ({ message, duration = 3000, onClose, type }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
};
