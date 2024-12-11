import { createSlice } from "@reduxjs/toolkit";

export const AllProucts = createSlice({
    name:"AllProducts",
    initialState:{
        Products:[]
    },
    reducers:{
        setAllProducts:(state,action)=>{
            state.Products= action.payload
        }
    }
})

export const {setAllProducts} = AllProucts.actions
