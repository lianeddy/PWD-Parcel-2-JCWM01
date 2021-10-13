import React from 'react'
import '../assets/styles/headerku.css'

function Headerku(props) {
    return (
        <div className="container title">
                    <h2 className="text-center">{props.title}</h2>
                    <p className="text-center">{props.description}</p>
                </div>
    )
}

export default Headerku
