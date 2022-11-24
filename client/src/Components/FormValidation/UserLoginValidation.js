import * as Yup from "yup"
const UserLoginValidation=Yup.object().shape({
    email:Yup.string().email("Not a Valid email").required("Email is invalid"),
    password:Yup.string().required("Password is Required")

})
export default UserLoginValidation