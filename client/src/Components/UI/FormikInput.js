import React from "react";
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
    useFormik
}from 'formik'


export function Form(props){
    return(
       <Formik {...props}>
        <FormikForm>
                {props.children}
        </FormikForm>
        </Formik>
      
    )
}
export function TextFeild(props){
    const {type,name,value,placeholder,...rest}=props
    return(
        <>
        {label && <label for={name}>{lable}</label>}
        <Field
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        {...rest}
        />
        </>
    )
}

export function SelectFeild(props){
    const {options,name,value,placeholder,...rest}=props
    return(
        <>
        {label && <label for={name}>{name}</label>}
        <Field
        component="select"
        name={name}
        id={name}
        >
            <options value="">...Choose</options>
            </Field>
        </>
    )
}