import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import bgCreator from './../../Assets/Login.png'
import axios from 'axios'
import { actionCreator } from '../../State/index'
import { channelActionCreator } from '../../State/index'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//import GraphicEqIcon from '@mui/icons-material/GraphicEq';
function RegisterForm(props) {
    const navigator = useNavigate()
    const [FormEleArray, setFormElement] = useState([])
    const [initialVal, setInitialVal] = useState({})
    const [SumbitText, setSubmitText] = useState('')
    const [ServerUrl, setServerUrl] = useState('')
    const [uploaded, setUploaded] = useState(0)
    const [userType,setUserType]=useState('')
    const [profilePic,setProfilePic]=useState(bgCreator)
    const dispatch = useDispatch()
    const selectorData=useSelector(STATE=>STATE.channel)
   
    //const [otherDetails,setOtherDetails]=useState([])
    const [UserRegisterValidation, setValidationSchema] = useState({})

    useEffect(() => {
        let RegisterData = props.RegisterData
        let ele = []
        let init = {}
        setServerUrl(RegisterData.axiosRequest)
        setValidationSchema(props.UserRegisterValidation)
        for (let key in RegisterData.orderForm) {
            ele.push({
                id: key,
                config: RegisterData.orderForm[key]
            })
            init[key] = ''
        }
        console.log(ele, init)
        setSubmitText(RegisterData.submitText)
        setFormElement(ele)
        setInitialVal(init)
        setUserType(RegisterData.userType)
    }, [props.RegisterData, props.UserRegisterValidation])
    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
                        {console.log(profilePic)}
                        <img src={profilePic} className='h-full' alt='register' />
                    </div>
                    <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <Formik
                            initialValues={initialVal}
                            validationSchema={UserRegisterValidation}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    setSubmitting(false);

                                    const data = new FormData()
                                    for (let key in values) {
                                        console.log(key)
                                        if (key !== 'undefined') {
                                            data.append(key, values[key])
                                        }
                                        else {

                                            data.append('Pp', values['undefined'])
                                        }
                                    }
                                    if(userType==='Channel'){
                                        let creator=selectorData.creatorId
                                        console.log(creator)
                                        data.append('channelCreator',creator)
                                    }
                                    if(userType==='Creator'){
                                        let token=localStorage.getItem('Token')
                                        console.log(token)
                                        data.append('accessToken',token)
                                    }
                                    console.log(data.get('undefined'))
                                    axios.post(ServerUrl, data, {
                                        onUploadProgress: (data) => {
                                            setUploaded(Math.round((data.loaded / data.total) * 100))
                                        }
                                    })
                                        .then(result => {
                                            
                                            // navigator('/')
                                            alert(result)
                                            
                                            if(userType==='Creator'){
                                                const action = bindActionCreators(channelActionCreator, dispatch)
                                                action.AddCreatorId(result.data.id)
                                                navigator('/Channel')
                                            }
                                            else if(userType==='Channel'){
                                                const action = bindActionCreators(channelActionCreator, dispatch)
                                                action.AddChannelId(result.data._id)
                                                navigator('/Channel')
                                            }
                                            else{
                                                localStorage.setItem('accessToken',result.data.token)
                                                const action = bindActionCreators(actionCreator, dispatch) 
                                                action.AssignAccessToken(result.data.token)
                                                navigator('/')
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            alert(err)
                                        })
                                }, 400);
                            }}
                        >
                            {({ values, errors, touched, handleChange, setFieldValue, isSubmitting }) => (
                                <Form >
                                    {FormEleArray.map((ele) => {
                                        return (
                                            <div className='flex -mx-3'>
                                                <div className="w-full px-3 mb-5">
                                                    {/*<label for={ele.id} class="text-xs font-semibold px-1">{ele.id}</label>*/}
                                                    <div className="flex">
                                                        {ele.config.elementConfig.type !== 'file' ?
                                                            <>
                                                                <Field
                                                                    type={ele.config.elementConfig.type}
                                                                    placeholder={ele.config.elementConfig.placeholder}
                                                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                                    value={values[ele]}
                                                                    onChange={handleChange}
                                                                    name={ele.id}
                                                                />
                                                                {errors[ele.id] && touched[ele.id] ? <div className='text-red-500 text-xs italic'>{errors[ele.id]} </div> : null}
                                                            </> : <>
                                                                <Field
                                                                    type={ele.config.elementConfig.type}
                                                                    placeholder={ele.config.elementConfig.placeholder}
                                                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                                    value={values[ele]}
                                                                    onChange={(event) => {
                                                                        setFieldValue(ele.id, event.currentTarget.files[0]);
                                                                        setProfilePic(URL.createObjectURL(event.currentTarget.files[0]))
                                                                    }}
                                                                    name={ele.id}
                                                                />
                                                                {errors[ele.id] && touched[ele.id] ? <div className='text-red-500 text-xs italic'>{errors[ele.id]} </div> : null}
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div class="flex -mx-3">
                                        <div class="w-full px-3 mb-5">
                                            <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">{SumbitText}</button>
                                        </div>
                                    </div>
                                </Form>
                            )}

                        </Formik>
                        <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700 mt-1">
                            <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-white" style={{ width: `${uploaded}%` }}>Progress: {uploaded}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm