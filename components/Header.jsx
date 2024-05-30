import React from "react"


export default function Header(props){
    return (
        
        <nav className={props.mode ? "dark" : ""}>
            <h3>Bring some colors to the world</h3>
            <div className="toggler" >
                    <p className="toggler--light">Light</p>
                    <div className="toggler--slider"
                         onClick = {props.toggle}
                    >
                        <div className="toggler--slider--circle"></div>
                    </div>
                    <p className="toggler--dark">Dark</p> 
            </div>
        </nav>
    )
}