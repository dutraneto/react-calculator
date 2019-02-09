import React from 'react'
import './Button.css'

export default props => {

    return (

        <button
        onClick={e => props.click && props.click(props.label)}
        // using template string for manipulationg html classes
        className={
                    `
                    button
                    ${props.operation ? 'operation' : ''}
                    ${props.double    ? 'double'    : ''}
                    ${props.triple    ? 'triple'    : ''}
                    ${props.c         ? 'c'    : ''}

                    `
        }>   
        {props.label}  
        </button>
    )
}