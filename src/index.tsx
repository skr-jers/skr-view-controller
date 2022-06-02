import React             from 'react';
import ReactDOM          from 'react-dom/client';
import './index.css';
import App               from './App';
import reportWebVitals   from './reportWebVitals';
import componentRenderer from "./componentRenderer";

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
            props: null
        }
    ]
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      {componentRenderer(json)}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
