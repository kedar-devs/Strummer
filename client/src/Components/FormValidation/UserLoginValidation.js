import * as Yup from "yup"
const UserLoginValidation=Yup.object().shape({
    email:Yup.string().email("Not a Valid email").required("Email is invalid"),
    password:Yup.string().required("Password is Required").min(8,"Password should be atleast 8 character long").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password not strong enough")

})
export default UserLoginValidation