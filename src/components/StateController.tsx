import React, {useEffect} from 'react'
import componentRenderer  from "../componentRenderer";
import {useDispatch}     from "react-redux";


const json = {
	instanceOf: "container",
	props: null,
	children: [
		{
			instanceOf: "form",
			props: {
				name: "formulario_ejemplo"
			},
			children: [
				{
					instanceOf: "inputText",
					props: {
						name: "nombre",
						id: "nombre",
						label: "Nombre",
						placeholder: "Juanito"
					}
				},
				{
					instanceOf: "inputText",
					props: {
						name: "apellido",
						id: "apellido",
						label: "Apellido",
						placeholder: "Sánchez"
					}
				}
			]
		},
		{
			instanceOf: "table",
			props: {
				data:{
					dataSourceId: "companies",
					attributes:
						{
							uri: "/companies",
							hostname: "localhost",
							dataObject: "table",
							method: "GET"
						}
				},
			}
		},
		{
			instanceOf: "table",
			props: {
				data:{
					dataSourceId: "users",
					attributes:
						{
							uri: "/users",
							hostname: "localhost",
							dataObject: "table",
							method: "GET"
						}
				},
			}
		},
		{
			instanceOf: "table",
			props: {
				data:{
					dataSourceId: "policies",
					attributes:
						{
							uri: "/policies",
							hostname: "localhost",
							dataObject: "table",
							method: "GET"
						}
				},
			}
		},
		{
			instanceOf: "form",
			props: {
				fields: [
					{
						name: "rfc",
						type: "text",
						required: true,
						validation: "rfcValidate"
					}
				]
			}
		}
	]
}

const StateController = () => {
	//Llamada al orquestador
	//json = fetch(/orquestador/kerno2)

	const dispatcher = useDispatch()

	let resources:any[] = []
	function getResourcesList(json:any, resources: any[]): string[]{
		if (json.props?.data) {
			resources.push(json.props.data)
		}
		json.children && json.children.map((child: any) => getResourcesList(child, resources))
		return resources
	}


	function dataResolver(resource: any) {
		console.log(resource)
		const {dataSourceId, attributes} = resource
		return (dispatch: (arg0: { type: string; payload: Response | null; }) => void)=> {
			dispatch( {type: `${dataSourceId}/${dataSourceId}OnWaiting`, payload: null})
			fetch(attributes.hostname+attributes.uri).then(response=>{
				dispatch( {type: `${dataSourceId}/${dataSourceId}OnSuccess`, payload: response})
			}).catch(error=>{
				dispatch( {type: `${dataSourceId}/${dataSourceId}OnFailure`, payload: null})
			})
		}
	}
	useEffect(()=> {
	// @ts-ignore
		findNestedObject(json, "props").forEach(resource => dispatcher(dataResolver(resource)) )
	},[])
	return (
		<>
			{componentRenderer(json)}
		</>
	)
}

export default StateController