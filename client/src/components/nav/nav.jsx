import React from "react";
import Logo from "../../img/dog.png"
import { useDispatch } from "react-redux";
import { getBreeds } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar.jsx"

export default function Nav(){
    const dispatch=useDispatch()
    function handleClick(e){
        dispatch(getBreeds())
    }
    return(
        <nav>
            <div className="logo">
                <a href="/home">
                    <img src={Logo} alt="logo"/>
                </a>
            </div>
                <ul>
                    <li>
                        <NavLink exact to="/home" onClick={e=>handleClick(e)}>Home</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to="/create">Crear</NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink exact to="/dogD/:id">Detalles</NavLink>
                    </li>
                </ul>
                <SearchBar/>
        </nav>
    )
}