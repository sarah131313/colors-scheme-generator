import React from 'react'
import ReactDOM from 'react-dom/client'
import {useState} from "react"

import Header from "./components/Header"
import Content from "./components/Content"


function App() {
  const [darkMode, setDarkMode] = useState(false)
  function toggle(){
    setDarkMode(prevMode => !prevMode)
  }
  
  
  return (
    <div className ={`container-${darkMode ? "dark" : ""}`}>
      <Header
         mode={darkMode}
         toggle ={toggle} 
      />
      <Content
         mode={darkMode}
         toggle ={toggle} 
       />
    </div>
  )
  
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />) 