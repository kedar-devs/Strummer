import * as Yup from 'yup'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const UserMobileNoValidation=Yup.object().shape({
    contact:Yup.string().matches(phoneRegExp,'Phone number not valid')
})
export default UserMobileNoValidation