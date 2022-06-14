import React         from 'react'
import axios                                                                         from "axios";
import {useDeleteRecordMutation, useGetResourceByNameQuery, useUpdateRecordMutation} from "../app/service";
type Props ={

    data: {
        dataSourceId: string,
        attributes: [
            {
                "uri": string,
                "hostname": string,
                "dataObject": string,
                "method": string
            }
        ]
    }
    columns:[
        {
            id: string,
            header: string,
            accessor: string,
            cell?: {
                type: string,
                payload:any
            },
            buttons?: [{
                actionType:string
                params: any,
                label?: string,
                icon?: string
            }]
        }
    ]
}

// @ts-ignore
const transformValue = (value: boolean,{trueValue, falseValue}) =>{
    return value? trueValue: falseValue
}
const editEntry = (value:string) => {
    // @ts-ignore
    return <button onClick={()=>console.log("Vamos a editar el registro: " + value)}>Editar</button>
}
const putAction=(value:string, url:string, body: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [updateRecord, result] = useUpdateRecordMutation()
    return <button onClick={()=>updateRecord({url, value, body })}>Aumentar cantidad</button>
    // <button onClick={()=>console.log("xD")}>Aumentar cantidad</button>
}

// @ts-ignore
const button = (value, payload) => {
    // @ts-ignore
    return React.createElement(TableRowButton, {value, payload} )
}
    // @ts-ignore
const TableRowButton = ({value, payload, actionType, label, icon}) => {

    const { resource, body} = payload
    const [updateRecord, ] = useUpdateRecordMutation()
    const [deleteRecord, ] = useDeleteRecordMutation()
            // @ts-ignore

    const actionTypes = {
        update: updateRecord,
        delete: deleteRecord
    }
    return (
            // @ts-ignore
            <button onClick={()=>actionTypes[actionType]({resourceName: resource, recordId: value, body })}>{label}</button>
    )
}

const actions= {
    transformValue,
    editEntry,
    putAction,
    button
}


const Table = ({data, columns}: Props) => {
    /** acceder al objeto "state" que debe envolver a toda la aplicación, o al menos a este componente.
     *  Esto puede ser React.contextAPI o Redux
     */
    // @ts-ignore
    //const componentData= useSelector((state)=>state[data.dataSourceId])
    //const {data: tableData, status} = componentData

    // @ts-ignore
    const {data: tableData, error, isLoading } = useGetResourceByNameQuery(data.dataSourceId)




    return (
        !isLoading?
        <table style={{border: "1px solid blue", padding: "10px", margin: "10px 0 10px 0"}}>
            <thead>
            <tr>
                {
                    // @ts-ignore
                    columns.map((column, index)=><th key ={index}>{column.header}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {
                // @ts-ignore
                tableData.map((row, index)=>{
                    // @ts-ignore
                    return(
                        <tr key={index}>
                            {
                                columns.map((column, index)=><td key={index}>{
                                    column.buttons? column.buttons.map((button)=>{
                                        return (<TableRowButton
                                            key={`${index}_${row[column.accessor]}_${button.actionType}`}
                                            value={row[column.accessor]}
                                            actionType={button.actionType}
                                            payload={button.params}
                                            label={button.label}
                                            icon={button.icon}
                                        />)
                                        }):column.cell?
                                        // @ts-ignore
                                        actions[column.cell.type](row[column.accessor],column.cell.payload):
                                        row[column.accessor]
                                }</td>)
                            }
                        </tr>
                    )
                })
            }
            </tbody>
        </table>: isLoading? "Cargando...": "Ocurrió un error"

    )
}

/**
 * <table style={{border: "1px solid blue", padding: "10px", margin: "10px 0 10px 0"}}>
 *             <thead>
 *                 <tr>
 *                     {
 *                         tableDataTemp.columns.map(column=><th>{column}</th>)
 *                     }
 *                 </tr>
 *             </thead>
 *             <tbody>
 *             {
 *                 tableDataTemp.rows.map(row=>{
 *                     return(
 *                         <tr>
 *                             {row.map(cell=><td>{cell}</td>)}
 *                         </tr>
 *                     )
 *                 })
 *             }
 *             </tbody>
 *         </table>
 */

export default Table