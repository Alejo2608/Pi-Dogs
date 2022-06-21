import React,{useState,useEffect} from "react";
import {Link,useHistory} from "react-router-dom";
import {postDog,getTemperaments} from '../../redux/actions/index.js'
import {useDispatch,useSelector} from "react-redux";


function validate(input){
    let errors={}
    if (!input.name) {
        errors.name="Se requiere un nombre"
    }else if (!input.life_span) {
        errors.life_span="Requiere "
    }
    return errors
}

export default function Create(){
    const dispatch=useDispatch()
    const history=useHistory()
    const temperaments=useSelector((state)=>state.temperaments)
    const [errors,setErrors]=useState({})
    const [input,setInput]=useState({
        name:"",
        height_ma:"",
        height_mi:"",
        weight_ma:"",
        weight_mi:"",
        life_span:"",
        temperament:[]
    })
    input.height={"metric":input.height_mi + " - " + input.height_ma}
    input.weight={"metric":input.weight_mi + " - " + input.weight_ma}
    const vali=(parseFloat(input.height_mi)>parseFloat(input.height_ma))
    const valiW=(parseFloat(input.weight_mi)>parseFloat(input.weight_ma))

    function validate(input){
        let errors={}
        if (!input.name) {
            errors.name=alert("Se requiere un nombre")
        }
        return errors
    }



    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }
    function handleSelect(e){
        setInput({
            ...input,
            temperament:[...input.temperament,e.target.value]
        })
    }
    const valName=(isNaN(input.name))
    console.log(valName)
    function handleSubmit(e){
        if (valName===false) {
            errors.name=alert("No se permiten numeros en el nombre")
        }else if (vali===true) {
            errors.height=alert("Por favor ingresa una altura correcta")
        }else if (valiW===true) {
            errors.height=alert("Por favor ingresa un peso correcto")
        }else {
            e.preventDefault()
            console.log(input)
            dispatch(postDog(input)) 
            alert("Raza Creada")  
            setInput({
                name:"",
                height_ma:"",
                height_mi:"",
                weight_ma:"",
                weight_mi:"",
                life_span:"",
                temperament:[]
            })
            history.push("/home")
        }
    }
    
        useEffect(()=>{
            dispatch(getTemperaments())
        },[])
    return(
        <div className="created">
            <form onSubmit={e=>handleSubmit(e)} className="form">
                <h1>Crea tu raza</h1>
                <div>
                    <br />
                    <label>Nombre:</label>
                    <br />
                    <input 
                    type="text" 
                    className="field"
                    value={input.name}
                    name="name" 
                    onChange={handleChange}/>
                    {errors.name&&(
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <br />
                    <label>Altura Minima:</label>
                    <br />
                    <input 
                    type="text" 
                    className="field"
                    value={input.height_mi} 
                    name="height_mi"
                    onChange={handleChange}/>
                    <br />
                    <br />
                    <label>Altura Maxima:</label>
                    <br />
                    <input 
                    type="text" 
                    className="field"
                    value={input.height_ma} 
                    name="height_ma"
                    onChange={handleChange}/>
                </div>
                <div>
                    <br />
                    <label>Peso Minimo:</label>
                    <br />
                    <input 
                    type="text"
                    className="field"
                    value={input.weight_mi} 
                    name="weight_mi" onChange={handleChange}/>
                    <br />
                    <br />
                    <label>Peso Maximo:</label>
                    <br />
                    <input 
                    type="text" 
                    className="field"
                    value={input.weight_ma} 
                    name="weight_ma"
                    onChange={handleChange}/>
                </div>
                <div>
                    <br />
                    <label>Años de vida:</label>
                    <br />
                    <input 
                    type="text"
                    className="field"
                    value={input.life_span}
                    name="life_span" 
                    onChange={e=>handleChange(e)} />
                </div>
                <br />
                <div className="select">
                    <label> Temperamento:</label>
                    <br />
                    <br />
                    <select onChange={(e)=>handleSelect(e)}>
                        {temperaments.map((tem)=>(
                            <option value={tem.name}>{tem.name}</option>
                        ))}
                    </select>
                </div>
                <br />
                <ul><li>{input.temperament.map(e=>e+" ,")}</li></ul>
                <br />
                <div className="crear">
                    <button type="submit" className="center">Crear</button>
                </div>
            </form>
        </div>
    )
}