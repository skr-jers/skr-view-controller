import React from 'react'

const Container = ({children}) => {
    return (
        <div style = {
            {
                border: "1px solid red",
                padding: "15px",
            }
        }>
            {children}
        </div>
    )
}

export default Container