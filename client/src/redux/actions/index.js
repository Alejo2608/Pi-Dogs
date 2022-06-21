import axios from "axios"
export const GET_ALL_BREEDS="GET_ALL_BREEDS"
export const FILTER_CREATED="FILTER_CREATED"
export const ORDER_BY_NAME="ORDER_BY_NAME"
export const GET_NAME_BREED="GET_NAME_BREED"
export const GET_TEMPERAMENTS="GET_TEMPERAMENTS"
export const GET_DETAIL="GET_DETAIL"
export const ORDER_BY_WEIGHT="ORDER_BY_WEIGHT"



export function getBreeds(){
    return async function (dispatch){
        var json=await axios.get("http://localhost:3001/dogs",{})
        return dispatch({
            type:GET_ALL_BREEDS,
            payload:json.data
        })
    }
}
export function getTemperaments(){
    return async function(dispatch){
        var info=await axios('http://localhost:3001/temperaments',{})
        return dispatch({
            type:GET_TEMPERAMENTS,
            payload:info.data
        
        })
    }
}
export function postDog(payload){
    return async function(dispatch){
        const data=await axios.post('http://localhost:3001/dogs',payload)
        console.log(data)
        return data
    }
}
export function getNameBreed(name){
    return async function(dispatch){
        try{
            var json= await axios('http://localhost:3001/dogs?name=' + name)
            return dispatch({
                type:GET_NAME_BREED,
                payload:json.data
            })
        }catch(err){
            console.log(err)
        }
    }
}

export function filterCreated(payload){
    return {
        type:FILTER_CREATED,
        payload
    }
}
export function orderByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload
    }
}
export function orderByWeight(payload){
    return{
        type:ORDER_BY_WEIGHT,
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json=await axios("http://localhost:3001/dogs/"+id)
            return dispatch({
                type:GET_DETAIL,
                payload:json.data
            })
        }catch(err){
            console.log(err)
        }
    }
}