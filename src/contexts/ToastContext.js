import { createContext, useContext, useState } from "react";
import MySnackBar from "../component/MySnackBar";
export const ToastContext = createContext({});
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState();

  function showHideToast(message) {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setmessage(message);
    }, 2000);
  }
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnackBar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
