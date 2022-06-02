import React     from "react";
import Container from "./components/Container";
import Form      from "./components/Form.jsx";
import Table     from "./components/Table.tsx";
import InputText from "./components/InputText";

const Components = {
    container: Container,
    inputText: InputText,
    form: Form,
    table: Table
};
/**
 *
 * @param component Es el objeto json que define el componente
 * @returns {React.FunctionComponentElement<{}>|React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>}
 */
const componentRenderer = (component) => {
    console.log("Se ejecuta función de render")
    // component does exist
    if (typeof Components[component.instanceOf] !== "undefined") {
        return React.createElement(
            Components[component.instanceOf],
            component.props,
            component.children && component.children.map(child => componentRenderer(child) )
        );
    }
    // component doesn't exist yet
    return React.createElement(
        () => <div>The component {component.instanceOf} has not been created yet.</div>
    );
}

export default componentRenderer
