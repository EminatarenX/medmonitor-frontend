import { Flip, ToastContainerProps, ToastPosition } from "react-toastify"
export const toastStyles: Partial<ToastContainerProps> = {
    position:"top-center" as ToastPosition,
      autoClose:5000,
      hideProgressBar:false,
      newestOnTop:false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme:"colored",
      transition: Flip,
      stacked: true,
}