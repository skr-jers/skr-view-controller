import React from 'react'

const InputText = ({label, placeholder, name, id}) => {
	return (
		<div style={{ border: "1px solid cyan", display: "flex", padding: "5px" }}>
			<label htmlFor={id}>{label}</label>
			<input id={id} type="text" placeholder={placeholder} name={name} />
		</div>
	)
}

export default InputText