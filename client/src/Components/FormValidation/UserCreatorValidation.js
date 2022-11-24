import * as Yup from 'yup'
const UserCreatorValidationSchema=Yup.object().shape({
    email:Yup.string().email("Not a valid email").required("Email is required"),
    password:Yup.string().required("Password is Required").min(8,"Password should be min 8 characters long").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password not strong enough"),

})
export default UserCreatorValidationSchema