import React from "react";
import { Link } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import { useDispatch } from "react-redux";

export default function Card({id,url,name,weight,temperament}){
    const dispatch=useDispatch()
    
    return(
        <Link to={"/detail/" + id} onClick={()=>dispatch(getDetail(id))}>
        <div className="card">
            <div className="img_">
                <img src={url} alt="img not fund"/>
            </div>
            <div className="name">
                <h1>Nombre</h1>
                <h1>{name}</h1>
            </div>
            <div className="car">
                <p>Peso</p>
                <p>{weight}</p>
                <p>Temperamento</p>
                <p>{temperament}</p>
            </div>
        </div>
        </Link>
    )
}