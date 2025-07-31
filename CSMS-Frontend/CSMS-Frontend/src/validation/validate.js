import { toast } from "react-toastify";

export const validateRegisterInfo = (values) => {
    if (values.name.length === 0 || values.email.length === 0 || values.password.length === 0 || values.address.length === 0) {
        toast.error("field cannot be empty!!", { position: "top-center" })
        return false;
    }

    if (values.name.length < 5) {
        toast.error("Name must have 5 characters!!", { position: "top-center" })
        return false;

    }

    if (values.phone.length !== 10) {
        toast.error("Enter valid phone number!!", { position: "top-center" })
        return false;

    }

    if (values.password.length < 4) {
        toast.error("Enter a strong password!!", { position: "top-center" })
        return false;

    }

    return true;

}