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
    console.log(data)
    // @ts-ignore
    const componentData= useSelector((state)=>state[data.dataSourceId])
    const {data: tableData, status} = componentData
    const tableDataTemp= {
        columns: ["Nombre", "Dirección"],
        rows: [
            ["Empresa1", "Calle A"],
            ["Empresa2", "Calle B"],
            ["Empresa3", "Calle C"],
        ]
    }

    return (
        <table style={{border: "1px solid blue", padding: "10px", margin: "10px 0 10px 0"}}>
            <thead>
                <tr>
                    {
                        tableDataTemp.columns.map(column=><th>{column}</th>)
                    }
                </tr>
            </thead>
            <tbody>
            {
                tableDataTemp.rows.map(row=>{
                    return(
                        <tr>
                            {row.map(cell=><td>{cell}</td>)}
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
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