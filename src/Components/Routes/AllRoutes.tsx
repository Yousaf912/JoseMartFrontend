import { createBrowserRouter } from "react-router-dom";
import App from '../../App'
import SignUplOGIN from "../SignUpAndLogin/SignUpAndLogin";
import { SingleProduct } from "../Products/SIngleproduct";
import { AllProductsPage } from "../Products/AllProucts";
import { AddtoCart } from "../AddtoCart/AddToCart";

export const AllRoutes = createBrowserRouter([
    {
        path:'/',
        element:<App/>
    },
    {
        path:'/home',
        element:<App/>
    },
    {
        path:'/signup',
        element:<SignUplOGIN/>
    },
    {
        path:'/login',
        element:<SignUplOGIN/>
    },
    {
        path:'/home/product/:id',
        element:<SingleProduct/>
    },
    {
        path:'/home/products/:catagory',
        element:<AllProductsPage/>
    },
    {
        path:'/searchProduct/:querry',
        element:<AllProductsPage/>
    },
    {
        path:'/home/addtocart',
        element:<AddtoCart/>
    }
   
])