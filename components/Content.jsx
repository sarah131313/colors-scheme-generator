import React from "react"
import {useState, useEffect} from "react"
import chevronDown from './icons8-chevron-down.png'

export default function Content(props){
    const [myData, setMyData] = useState({
        color:'#000000',
        paletteType: ''
    })
    
    const [colorGenerated, setColorGenerated] = React.useState({})
  
    
    useEffect(()=>{
        let hexColor = myData.color.startsWith('#') ? myData.color.substring(1) : myData.color
        fetch(`https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${myData.paletteType}&count=5`)
           .then(res => res.json())
           .then(data => setColorGenerated(data))
    },[myData.color, myData.paletteType])
    
    
    const colorsArray = colorGenerated && colorGenerated.colors ? colorGenerated.colors.map(color => color.hex.value) : []
    
      const [renderArrayColor, setRenderArrayColor] = useState([])

   
    function getColorScheme(event) {
            event.preventDefault()
        
            const colorElements = colorsArray.map((color, index) => (
                <div key={index} className="color-and-code-container"  onClick={() => copyToClipboard(color)}>
                    <div className="color-container">
                        <div className="color--displayed" style={{ backgroundColor: color }}></div>
                    </div>
                    <div className="color-hex">
                        <p className="color-code">{color}</p>
                    </div>
                </div>
            ))
    
            setRenderArrayColor(colorElements)
        }
        
        
     function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                alert(`Copied ${text} to clipboard`)
            }).catch(err => {
                console.error('Failed to copy: ', err)
                fallbackCopyTextToClipboard(text)
            })
        } else {
            fallbackCopyTextToClipboard(text)
        }
    }
    
     function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea")
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
            document.execCommand('copy')
            alert(`Copied ${text} to clipboard`)
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err)
        }
        document.body.removeChild(textArea)
    }
        
    
    
    function handleChanges(event){
         const {name,value} = event.target
        setMyData(prevObject => ({
            ...myData,
           [name]: value
        }))
    }
    
    return (
        <main className={props.mode ? "dark" : ""}>
           <form className="form--color"  onSubmit={getColorScheme}>
              <input type="color"
                     value={myData.color}
                     name="color"
                     onChange={handleChanges}
               />
              <div className="select-container">
                <select className="select-box"
                        name="paletteType"
                        value={myData.paletteType}
                        onChange={handleChanges}
                >  
                    
                    <option value="monochrome">Monochrome</option>
                    <option value="monochrome-dark">Monochrome-dark</option>
                    <option value="monochrome-light">Monochrome-light</option>
                    <option value="analogic">Analogic</option>
                    <option value="complement">Complement</option>
                    <option value="analogic-complement">Analogic-complement</option>
                    <option value="triad">Triad</option>
                    <option value="quad">Quad</option>
                </select>
                <div className="icon-container">
                   <img src={chevronDown} alt="chevron down" />
                </div>
                
              </div>
              <button type="submit">Get color scheme</button>
           </form>
           <div className="show--color">
                 {renderArrayColor}
           </div>
        </main>
    )
}
