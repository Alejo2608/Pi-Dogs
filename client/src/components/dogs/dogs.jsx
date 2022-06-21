import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getBreeds } from '../../redux/actions';

export const Dogs=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{dispatch(getBreeds)})
    const breeds=useSelector(state=>(state.breeds))
    console.log(breeds)
    const card=breeds.map(i=>{<li key={i.id}>{i.name}</li>})
    return (
        <ul>
            {card}
        </ul>
    )
}