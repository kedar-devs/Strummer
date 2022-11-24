import * as Yup from 'yup'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const UserRegisterValidationSchema=Yup.object().shape({
    email:Yup.string().email("Not A Valid Email").required("Email id is required"),
    password:Yup.string().required("Password is required").min(8,"Password should be min 8 characters long").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password not strong enough"),
    contact:Yup.string().matches(phoneRegExp,'Phone number not valid')
})
export default UserRegisterValidationSchema
