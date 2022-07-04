import React from 'react'
import componentRenderer       from "../componentRenderer";
import {Provider } from "react-redux";
import store              from "../store";


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
							},
							{
								actionType: "stateMutation",
								params: {
									stateKey: "policySelected",
								},
								label: "Editar registro"
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
					originResource: "policies",
					stateKey: "policySelected"
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
					},
					{
						id: "address",
						header: "Dirección 2",
						accessor: "address"
					}
				]
			}
		},
	]
}

const StateController = () => {

	return (
		<Provider store={store([])}>
			{componentRenderer(json)}
		</Provider>
	)
}

export default StateController