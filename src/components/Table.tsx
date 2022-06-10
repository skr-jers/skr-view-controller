import React         from 'react'
import {useSelector} from "react-redux";
import {log}         from "util";
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
            }
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
const actions= {
    transformValue,
    editEntry
}


const Table = ({data, columns}: Props) => {
    /** acceder al objeto "state" que debe envolver a toda la aplicación, o al menos a este componente.
     *  Esto puede ser React.contextAPI o Redux
     */
    // @ts-ignore
    const componentData= useSelector((state)=>state[data.dataSourceId])
    const {data: tableData, status} = componentData

    return (
        status=== "success"?
        <table style={{border: "1px solid blue", padding: "10px", margin: "10px 0 10px 0"}}>
            <thead>
            <tr>
                {
                    // @ts-ignore
                    columns.map(column=><th>{column.header}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {
                // @ts-ignore
                tableData.map(row=>{
                    // @ts-ignore
                    return(
                        <tr>
                            {
                                columns.map(column=><td>{
                                    column.cell?
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
        </table>: status==="waiting"? "Cargando...": "Ocurrió un error"

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