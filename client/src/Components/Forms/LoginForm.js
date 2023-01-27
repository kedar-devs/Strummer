import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field } from 'formik'
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import axios from 'axios'
import {actionCreator,channelActionCreator} from '../../State/index'
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux' 
//import axios from 'axios'
function LoginForm(props) {
    const navigate = useNavigate()
    const [initialVal,setInitialVal]=useState({})
    const [FormEleArray,setFormElement]=useState([])
    const [otherDetails,setOtherDetails]=useState({})
    const [serverUrl,setUrl]=useState('')
    const [UserLoginValidation,setValidationSchema]=useState({})
    const dispatch=useDispatch()

    
    useEffect(()=>{
        console.log(props,{...props})
        let LoginData=props.LoginData
        setValidationSchema(props.UserLoginMobileValidation)
        setUrl(LoginData.axiosRequest)
        console.log('In here',LoginData)
        var ele=[]
        var init={}
        var otherDetails={
            resetMessage:LoginData.resetMessage,
            resetLink:LoginData.resetLink,
            userType:LoginData.userType
        }
        setOtherDetails(otherDetails)
        for(let key in LoginData.orderForm){
            ele.push({
                id:key,
                config:LoginData.orderForm[key]
            })
            init[key]=''
        }

        console.log(init)
        setFormElement(ele)
        setInitialVal(init)
    },[props])
  return (
    <section className="h-screen">
    <div className="container px-6 py-12 h-full">
    <div className='flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="w-full"
          alt="Phone "
        />
      </div>
        <Formik
        initialValues={initialVal}
        validationSchema={UserLoginValidation}
        onSubmit={(values,{setSubmitting})=>{
            setTimeout(() => {
                console.log(serverUrl,values)
                setSubmitting(false);
                axios.post(serverUrl,values)
                .then(result=>{
                  if(otherDetails.userType==='User'){
                    const action=bindActionCreators(actionCreator,dispatch)
                  action.AssignAccessToken(result.data.token)
                  localStorage.setItem('Token',result.data.token)
                  navigate('/')
                  }
                  else if(otherDetails.userType==='Creator'){
                    const action = bindActionCreators(channelActionCreator, dispatch)
                    action.AddCreatorId(result.data.id)
                    navigator('/Channel')
                  }
                })
                .catch(err=>{
                  alert(err)
                })
              }, 400);
        }}
        >
            {({values,errors,touched,handleChange,isSubmitting})=>(
                <div className='md:w-8/12 lg:w-4/12 lg:ml-20'>
                    
                <Form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 '>
                    <div className="text-center">
                    <GraphicEqIcon className='mx-auto w-48' />
                    <h4 className=" mt-1 text-2xl mb-12 pb-1 underline font-mono" style={{color:'#1976d2'}}>Strummer</h4>
                    </div>
                    {FormEleArray.map((ele)=>{
                        return(
                        <>
                       <div className='c'>
                        <Field
                        type={ele.config.elementConfig.type}
                        placeholder={ele.config.elementConfig.placeholder}
                        value={values[ele.id]}
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        onChange={handleChange}
                        name={ele.id}
                        />
                        {errors[ele.id] && touched[ele.id] ? <div className='text-red-500 text-xs italic'>{errors[ele.id]} </div>: null}
                        </div>
                        </>
                        )
                    })}
                     <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck3"
                checked
              />
              <label className="form-check-label inline-block text-gray-800" for="exampleCheck2">Remember me</label
              >
            </div>
            <a
              href={otherDetails.resetLink}
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
              >{otherDetails.resetMessage}</a
            >
          </div>
                     <button type="submit"
                     className='inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
                     data-mdb-ripple="true"
                     data-mdb-ripple-color="light"
                     disabled={isSubmitting}>
                            Submit
                        </button>
                </Form>
                </div>
            )}

        </Formik>
    </div>
    </div>
    </section>
  )
}

export default LoginForm