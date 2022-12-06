import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { Formik, Form, Field, FieldArray } from 'formik'
// import GraphicEqIcon from '@mui/icons-material/GraphicEq';

function ContentForm(props) {
    const [FormEleArray, setFormData] = useState([])
    const [initialVal, setInitialVal] = useState({})
    // const [serverUrl, setUrl] = useState('')
    useEffect(() => {
        let formData = props.formData
        let ele = []
        let init = {}
        // setUrl(formData.axiosRequest)
        for (let key in formData.orderForm) {

            ele.push({
                id: key,
                config: formData.orderForm[key]
            })
            if (formData.orderForm[key].elementType !== 'multiOption') {
                init[key] = ''
            }
            else {
                init[key] = ['Vong']
            }
        }
        console.log(init)
        setFormData(ele)
        setInitialVal(init)
    }, [props])
    return (
        <div className="min-h-screen flex item-center justify-center bg-gray-500 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)" }}>
            <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
                <Formik
                    initialValues={initialVal}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            alert('submit was called')
                        }, 400)
                    }}
                >
                    {({ values, errors, touched, handleChange, setFieldValue, arrayHelpers, isSubmitting }) => (
                        <>
                            <div className="text-center">
                                <h2 className="mt-5 text-3xl font-bold text-gray-900 capitalize">
                                    We are glad!!!
                                </h2>
                                <p className="mt-2 text-sm text-gray-400 mb-3">to see you are uploading videos on our platform.</p>
                            </div>
                            <Form className="mt-8 space-y-3">
                                {FormEleArray.map((ele) => {
                                    return (
                                        <>
                                            {ele.config.elementConfig.type !== 'file' ? ele.config.elementType === 'multiOption' ? <>
                                                <FieldArray
                                                    name={ele.id}
                                                    render={arrayHelpers => (
                                                        <>
                                                        <div className="grid grid-cols-1 space-y-2">
                                                            <label className="text-sm font-bold text-gray-500 tracking-wide">{ele.id}</label>
                                                            {values[ele.id] && values[ele.id].length > 0 ? (
                                                                values[ele.id].map((element, index) => (
                                                                    <div key={index}>
                                                                        <Field name={ele.id[index]}
                                                                             className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                ))
                                                            ) :
                                                                (
                                                                    <button type="button" onClick={() => arrayHelpers.push("")}>
                                                                        Add Tags
                                                                    </button>
                                                                )


                                                            }
                                                            </div>
                                                            </>
                                                    )}
                                                />

                                            </> :
                                                <>
                                                <div className="grid grid-cols-1 space-y-2">
                                                <label className="text-sm font-bold text-gray-500 tracking-wide">{ele.id}</label>
                                                    <Field
                                                        type={ele.config.elementConfig.type}
                                                        placeholder={ele.config.elementConfig.placeholder}
                                                        value={values[ele.id]}
                                                        name={ele.id}
                                                        onChange={handleChange}
                                                        className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                                    />
                                                    {errors[ele.id] && touched[ele.id] ? <div className='text-red-500 text-xs italic'>{errors[ele.id]} </div> : null}
                                                    </div>
                                                </> : <>
                                                <div className="grid grid-cols-1 space-y-2">
                                                <label className="text-sm font-bold text-gray-500 tracking-wide">{ele.id}</label>
                                                <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                                <div className="h-full w-full text-center flex flex-col item-center justify-center">
                                                <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    <img class="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik" />
                                    </div>
                                    <p class="pointer-none text-gray-500 "><span class="text-sm">Drag and drop</span> files here <br /></p>
                                                    </div>
                                                <Field
                                                    type={ele.config.elementConfig.type}
                                                    placeholder={ele.config.elementConfig.placeholder}
                                                    className="hidden"
                                                    value={values[ele]}
                                                    onChange={(event) => {
                                                        setFieldValue(ele.id, event.currentTarget.files[0]);
                                                    }}
                                                    name={ele.id}
                                                />
                                                </label>
                                                </div>
                                                {errors[ele.id] && touched[ele.id] ? <div className='text-red-500 text-xs italic'>{errors[ele.id]} </div> : null}
                                            </div>
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
        </div>
    )
}

export default ContentForm