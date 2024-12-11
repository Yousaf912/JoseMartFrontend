import { createSlice } from "@reduxjs/toolkit";

const triger = createSlice({
    name:'Tokenslice',
    initialState:{
        triger:false
    },
    reducers:{
        setTriger:(state,action)=>{
           state.triger= action.payload
        }
    }
})

export default triger;
export const {setTriger} = triger.actions;