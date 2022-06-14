import React, {useState}                                                          from 'react'
import {useAddRecordMutation, useGetRecordByIdQuery, useUpdateRecordMutation} from "../app/service";
import {Formik, Form as FormikForm, Field}                                        from "formik";

const Form = ({name, fields, formAction, record}) => {
    const {actionType, targetResource} = formAction
    const [updateRecord] = useUpdateRecordMutation()
    const [addRecord] = useAddRecordMutation()
    const fieldNames= fields.map(field=> field.name)
    const id = 6
    const { data } = useGetRecordByIdQuery({resourceName: record.originResource, recordId:id})
    let initialValues = {}
    record.type === "new" ?
        initialValues = fieldNames.forEach(field=>{
            initialValues = {...initialValues, [field]: ""}
        }) :
        initialValues = data


    const formActions = {
        update: updateRecord,
        add: addRecord
    }
    return (
        <Formik initialValues={initialValues} onSubmit={(values)=>formActions[actionType]({resourceName: targetResource, recordId: id, body: values})} >
            <FormikForm name={name} style={ {
                border: "1px solid magenta",
                padding: "10px"
            }}
                  action={formAction}
            >
                <h1>Formulario: {name}</h1>
                <div style={{display: "grid",}}>
                    {
                        fields?fields.map((field) => <div style={{display: "flex", margin: "10px 0 10px 0"}}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <Field id={field.name} type={field.type} name={field.name} />
                        </div>):undefined
                    }
                </div>

                <button type="submit"> Enviar </button>
            </FormikForm>
        </Formik>

    )
}

export default Form