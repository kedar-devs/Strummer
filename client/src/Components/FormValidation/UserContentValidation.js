import * as Yup from 'yup'
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const SUPPORTED_FORMATS_VIDEO=['video/mp4','video/wav','video/ogg']
const UserContentValidationSchema=Yup.object().shape({
    Title:Yup.string().required('Title is Required'),
    Description:Yup.string().required('Description is Required'),
    photo:Yup.mixed().nullable().required('A file is required').test('Fichier taille','upload file', (value) => !value || (value && value.size <= 1024 * 1024)).test('format','Format not supported please upload jpg,png or jpeg', (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
    Video:Yup.mixed().nullable().required('A file is required').test('format','Format not supported please upload mp4,wav or ogg', (value) => !value || (value && SUPPORTED_FORMATS_VIDEO.includes(value.type))),
})
export default UserContentValidationSchema