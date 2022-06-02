import React from 'react'

const Form = ({name, children, display}) => {
    return (
        <form name={name} style={ {
            border: "1px solid magenta",
            padding: "10px"
        } }>
            <h1>Formulario: {name}</h1>
            <div style={{display: "grid",}}>
                {children}
            </div>
           
            <button type={ "submit" }> Enviar </button>
        </form>
    )
}

export default Form