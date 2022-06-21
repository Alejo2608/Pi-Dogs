import React from "react";
import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import { getBreeds,filterCreated, orderByName, orderByWeight,getDetail  } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import Paginated from "../paginated/paginated.jsx"

export default function Home(){
    const dispatch=useDispatch()
    const allBreeds=useSelector((state)=>state.breeds)
    const [orden,setOrden]=useState("")
    const [currentPage,setCurrentPage]=useState(1)
    const [breedsPerPage, setBreedsPerPage]=useState(8)
    const indexOfLastBreed=currentPage * breedsPerPage
    const indexOfFirstBreeds=indexOfLastBreed - breedsPerPage
    const currentBreed=allBreeds.slice(indexOfFirstBreeds,indexOfLastBreed)

    const paginated=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getBreeds())
    },[dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getBreeds())
    }
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSo(e){
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    return(
        <div>
            <div>
                <div className="sele">
                <button onClick={e=>handleClick(e)}>
                    Volver A Cargar Razas
                </button>
                <select onClick={e=>{handleSort(e)}}>
                    <option key="asc" value="asc">A-Z</option>
                    <option key="des" value="des">Z-A</option>
                </select>
                <select onClick={e=>{handleSo(e)}}>
                    <option key="men" value="men">Menor-Mayor</option>
                    <option key="may" value="may">Mayor-Menor</option>
                </select>
                <select onClick={e=>{handleFilterCreated(e)}}>
                    <option value="all">Todos</option>
                    <option value="created">Creados</option>
                    <option value="exis">Existentes</option>
                </select>
                </div>
                <div className="carss">
                    {currentBreed?.map((i)=>{
                            return(
                                    <Card
                                        url={i.url}
                                        name={i.name}
                                        temperament={i.temperament}
                                        key={i.id}
                                        weight={i.weight.metric}
                                        id={i.id}
                                    />
                            )
                        })
                    }
                </div>
            <Paginated
            breedsPerPage={breedsPerPage}
            allBreeds={allBreeds.length}
            paginated={paginated}
            />
            </div>  
        </div>
    )
}