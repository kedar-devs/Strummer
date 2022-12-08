import * as Yup from 'yup'
const UserChannelValidation=Yup.object().shape({
    channelName:Yup.string().required('Channel Name is required'),
    About:Yup.string().min(20,'Should be atleast 20 words').max(500,'Should be less than 500 words'),
})
export default UserChannelValidation