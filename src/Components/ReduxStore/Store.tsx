import { configureStore } from "@reduxjs/toolkit";
import { AllProucts } from "./ReduxSlice/AllProducts";
import triger from "./ReduxSlice/tokenslice";

export const store = configureStore({
    reducer:{
        triger:triger.reducer,
        allProducts:AllProucts.reducer,
     
    }

})

