import { FILTER_CREATED, GET_ALL_BREEDS, ORDER_BY_NAME,GET_NAME_BREED, GET_TEMPERAMENTS, GET_DETAIL, ORDER_BY_WEIGHT } from "../actions"

const initialState={
    breeds:[],
    allBreeds:[],
    temperaments:[],
    detail:[]
}

const rootReducer=(state=initialState,action)=>{
    switch (action.type) {
        case GET_ALL_BREEDS:
            return{
                ...state,
                breeds:action.payload,
                allBreeds:action.payload
            }
        case FILTER_CREATED:
            const createdFilter=action.payload === "created"? 
            state.allBreeds.filter(e=>e.createInDb):
            state.allBreeds.filter(e=>!e.createInDb)
            return{
                ...state,
                breeds:action.payload==="all"? 
                state.allBreeds:
                createdFilter
            }
        case "POST_BREEDS":
            return{
                ...state
            }
        case GET_TEMPERAMENTS:{
            return{
                ...state,
                temperaments:action.payload
            }
        }
        case GET_NAME_BREED:
            return{
                ...state,
                breeds:action.payload
            }
        case ORDER_BY_WEIGHT:
            let sorArr=action.payload==="men"?
                state.breeds.sort(function(a,b){

                    if (a.weight>b.weight) {
                        return 1
                    }
                    if (b.weight>a.weight) {
                        return -1
                    }
                    return 0
                }):
                state.breeds.sort(function(a,b){
                    if(a.weight>b.weight){
                        return -1
                    }
                    if(b.weight>a.weight){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    breeds:sorArr
                }

        case ORDER_BY_NAME:
            let sortedArr=action.payload==="asc"?
                state.breeds.sort(function(a,b){
                    if(a.name>b.name){
                        return 1
                    }
                    if(b.name>a.name){
                        return -1
                    }
                    return 0
                }):
                state.breeds.sort(function(a,b){
                    if(a.name>b.name){
                        return -1
                    }
                    if(b.name>a.name){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    breeds:sortedArr
                }
                case GET_DETAIL:
                    return{
                        ...state,
                        detail:action.payload
                    }
            default:
                return state
    }
}
export default rootReducer