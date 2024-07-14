import { toast } from "react-toastify";
export class Alerts{
    static toastify = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
        switch (type) {
        case 'success':
            toast.success(message, { style: { backgroundColor: 'royalblue'}})
            break;
        case 'error':
            toast.error(message)
            break;
        case 'warning':
            toast.warning(message)
            break;
        case 'info':
            toast.info(message)
            break;
        default:
            break;
        }
    }
}