import * as Yup from 'yup'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const UserMobileValidation=Yup.object().shape({
    contact:Yup.string().matches(phoneRegExp,'Phone number not valid'),
    otp:Yup.string().length(6,'Otp should be six characters long')
})
export default UserMobileValidation