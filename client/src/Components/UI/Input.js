import React from 'react'

function Input(props) {
    let inputElement=null

    switch(props.elementType){
        case 'input':
            inputElement=(
                <input
                type={props.elementType}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
            )
            break
        case 'textarea':
            inputElement=(
                <textarea
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
            )
            break
        // case 'select':
        //     inputElement=(
        //         <select
        //         value={props.value}
        //         onChange={props.changed}
        //         {...props.elementConfig.options.map((opt)=>(
        //             <option key={option.value} value={option.value}>
		// 					{option.displayValue}
		// 				</option>
        //         ))}
        //         />
        //     )
        //     break
        case 'file':
            inputElement=(
                <input
                type={props.elementType}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
            )
            break

        default:
            inputElement=(
                <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
            )
    }
    return (
    <div>
        <label>{props.key}</label>
        {inputElement}
    </div>
  )
}

export default Input