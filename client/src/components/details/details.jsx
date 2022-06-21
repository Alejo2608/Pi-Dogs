import React,{useEffect} from "react";
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import { getDetail } from "../../redux/actions";

export default function Detail(props){
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])

    const myDog=useSelector((state)=>state.detail)
    return(
        <div className="detail">
            {
                myDog.length>0?
                <div className="detail">
                    <img src={myDog[0].url} />
                    <h1>Nombre</h1>
                    <h2>{myDog[0].name}</h2>
                    <div className="p">
                    <h3>Temperamento</h3>
                    <p>{myDog[0].temperament}</p>
                    <h3>Peso</h3>
                    <p>{myDog[0].weight?myDog[0].weight.metric:"No"}</p>
                    <h3>Altura</h3>
                    <p>{myDog[0].height?myDog[0].height.metric:"No"}</p>
                    <h3>Años de vida</h3>
                    <p>{myDog[0].life_span}</p>
                    </div>
                </div>: <p>loading</p>

            }
        </div>
    )
}
