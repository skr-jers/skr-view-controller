import React         from 'react'
import {useSelector} from "react-redux";
import {log}         from "util";
type Props ={

    data: {
        dataSourceId: string,
        attributes: [
            {
                "uri": "/companies",
                "hostname": "localhost",
                "dataObject": "table",
                "method": "GET"
            }
        ]
    }
}

const Table = ({data}: Props) => {
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
                    tableData.columns.map(column=><th>{column}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {
                // @ts-ignore
                tableData.rows.map(row=>{
                    return(
                        <tr>
                            {
                                // @ts-ignore
                                row.map(cell=><td>{cell}</td>)
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