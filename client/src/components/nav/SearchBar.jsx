import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameBreed } from "../../redux/actions";

export default function SearchBar(){
  const dispatch=useDispatch()
  const [name,setName]=useState("")
  
  function handleInputChange(e){
    e.preventDefault()
    setName(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    dispatch(getNameBreed(name))
  }
  return(
    <div>
      <input type="text" placeholder="Search Breed" onChange={(e)=>handleInputChange(e)} className="pagi" />
      <button type="submit" onClick={(e)=>handleSubmit(e)} className="pagiBo">Search</button>
    </div>
  )
}