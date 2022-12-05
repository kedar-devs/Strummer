import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

function ContentForm(props) {
    const [FormEleArray, setFormData] = useState([])
    const [initialVal, setInitialVal] = useState({})
    const [serverUrl, setUrl] = useState('')
    useEffect(() => {
        let formData = props.formData
        let ele = []
        let init = {}
        setUrl(formData.axiosRequest)
        for (let key in formData.orderForm) {
            ele.push({
                id: key,
                config: formData.orderForm[key]
            })
            init[key] = ''
        }
        setFormData(ele)
        setInitialVal(init)
    }, [props])
    return (
        <div>
            <Formik
                initialValues={initialVal}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert('submit was called')
                    }, 400)
                }}
            >
                {({ values, errors, touched, handleChange, isSubmitting }) => (
                    <>
                        <Form>
                            {FormEleArray.map((ele) => {
                                return (
                                    <>
                                        {ele.config.elementConfig.type != 'file' ?
                                            <>
                                                <Field
                                                    type={ele.config.elementConfig.type}
                                                    placeholder={ele.config.elementConfig.placeholder}
                                                    value={values[ele.id]}
                                                    name={ele.id}
                                                    onChange={handleChange}
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
                                                    }}
                                                    name={ele.id}
                                                />
                                                {errors[ele.id] && touched[ele.id] ? <div className='text-red-500 text-xs italic'>{errors[ele.id]} </div> : null}
                                            </>
                                        }
                                    </>
                                )
                            })}
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    )
}

export default ContentForm