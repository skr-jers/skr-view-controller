import React, {useEffect} from 'react'
import componentRenderer  from "../componentRenderer";
import {useDispatch}      from "react-redux";
import axios              from "axios";


const json = {
	instanceOf: "container",
	props: null,
	children: [
		{
			instanceOf: "table",
			props: {
				data:{
					dataSourceId: "policies",
					attributes:
						{
							uri: "policies",
							hostname: "https://62a357635bd3609cee686264.mockapi.io/insurance/API/",
							dataObject: "table",
							method: "GET"
						}
				},
				columns: [
					{
						id: "id",
						header: "ID",
						accessor: "id"
					},
					{
						id: "branch",
						header: "Ramo",
						accessor: "branch"
					},
					{
						id: "amount",
						header: "Cantidad",
						accessor: "amount"
					},
					{
						id: "status",
						header: "Estado",
						accessor: "status",
						cell: {
							type: "transformValue",
							payload: {
								trueValue: "pagado",
								falseValue: "pendiente"
							}
						}
					},
					{
						id: "actions",
						header: "Acciones",
						accessor: "id",
						buttons: [
							{
								actionType: "update",
								params: {
									resource: "policies",
									body:{
										amount: 100
									}
								},
								label: "Cambiar a 100"
							},
							{
								actionType: "delete",
								params: {
									resource: "policies",
									body:{
										amount: 100
									}
								},
								label: "Eliminar registro"
							}
						]
					},
				]
			}
		},
		{
			instanceOf: "form",
			props: {
				name: "Nuevo registro",
				fields: [
					{
						name: "branch",
						type: "text",
						required: true,
						label: "Ramo"
					},
					{
						name: "amount",
						type: "number",
						required: true,
						label: "Cantidad"
					},
				],
				record: {
					type: "new",
				},
				formAction: {
					actionType: "add",
					targetResource: "policies"
				}

			}
		},
		{
			instanceOf: "form",
			props: {
				name: "Modificar registro existente",
				fields: [
					{
						name: "branch",
						type: "text",
						required: true,
						label: "Ramo"
					},
					{
						name: "amount",
						type: "number",
						required: true,
						label: "Cantidad"
					},
				],
				formAction: {
					actionType: "update",
					targetResource: "policies"
				},
				record: {
					type: "existing",
					originResource: "policies"
				}
			}
		},
		{
			instanceOf: "table",
			props: {
				data:{
					dataSourceId: "companies",
					attributes:
						{
							uri: "companies",
							hostname: "https://62a357635bd3609cee686264.mockapi.io/insurance/API/",
							dataObject: "table",
							method: "GET"
						}
				},
				columns: [
					{
						id: "id",
						header: "ID",
						accessor: "id"
					},
					{
						id: "name",
						header: "Nombre",
						accessor: "name"
					},
					{
						id: "address",
						header: "Dirección",
						accessor: "address"
					}
				]
			}
		},
	]
}

const StateController = () => {
	//Llamada al orquestador
	//json = fetch(/orquestador/kerno2)

	const dispatcher = useDispatch()

		let resources:any[] = []
	function getResourcesList(json:any,): string[]{
		if (json.props?.data) {
			resources.push(json.props.data)
		}
		json.children && json.children.map((child: any) => getResourcesList(child))
		return resources
	}
	// @ts-ignore
	function findAllByKey(obj, keyToFind) {
		// @ts-ignore
		// @ts-ignore
		const array = Object.entries(obj)
			.reduce((acc, [key, value]) => (key === keyToFind)
					// @ts-ignore
					? acc.concat(value)
					: (typeof value === 'object' && value)
						? acc.concat(findAllByKey(value, keyToFind))
						: acc
				, [])

			// @ts-ignore
		function getUniqueListBy(arr, key) {
			// @ts-ignore
			return [...new Map(arr.map(item => [item[key], item])).values()]
		}
							  // @ts-ignore
		return getUniqueListBy(array, "dataSourceId") || [];
	}




	function dataResolver(resource: any) {
		console.log(resource)
		const {dataSourceId, attributes} = resource

		// @ts-ignore
		return dispatch=> {
			dispatch( {type: `${dataSourceId}/${dataSourceId}OnWaiting`, payload: null})
			 axios.get(attributes.hostname+attributes.uri).then(response=>{
				dispatch( {type: `${dataSourceId}/${dataSourceId}OnSuccess`, payload: response.data})
			}).catch(error=>{
				dispatch( {type: `${dataSourceId}/${dataSourceId}OnFailure`, payload: null})
			})
		}
	}
	return (
		<>
			{componentRenderer(json)}
		</>
	)
}

export default StateController