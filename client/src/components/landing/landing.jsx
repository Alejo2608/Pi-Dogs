import React from "react";
import { Link } from "react-router-dom";

export default function Landing (){
    return(
        <div className="landin">
            <h1>CLICK ACA ABAJO PARA VER LOS PERRITOS</h1>
            <Link to="/home"><button>Ingresar</button></Link>
        </div>
    )
}