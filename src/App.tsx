import React from 'react';
import logo from './logo.svg';
import './App.css';
import componentRenderer from "./componentRenderer";
const json = {
  instanceOf: "container",
  props: null,
  children: [
    {
      instanceOf: "form",
      props: null
    },
    {
      instanceOf: "table",
      props: null
    }
  ]
}

function App() {
  console.log("entra al componente App")
  return componentRenderer(json)
}

export default App;
