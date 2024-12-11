import { useEffect, useState } from "react"
import { setAllProducts } from "../ReduxStore/ReduxSlice/AllProducts";
import { useDispatch, useSelector } from "react-redux";
import { Loder } from "../Loader";
import style from './home.module.css'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";



export const HomeProducts = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();


    const getProducts = async () => {
        try {
            await fetch('http://localhost:3000/getallproducts')
                .then(async (res) => {
                    const dta = await res.json();
                    if (res.ok) {
                        dispatch(setAllProducts(dta.alproducts.products))
                        setLoader(false)
                    }
                })
        } catch (er) { throw er }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const AllProducts = useSelector((state: any) => {
        return state.allProducts
    })

    const products = AllProducts.Products
    const token = localStorage.getItem('token');
   

    const openproduct=async(id:number)=>{
        try{
            if(token == null){
                toast.error('First Login into your account')
            }
            else{
                await fetch('http://localhost:3000/check',{
                    method:'GET',
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                }).then(async(res)=>{
                    const user = await res.json();
                    console.log(user);
                    
                    const userid = user.user.finduser._id
                   await localStorage.setItem('userid',userid)
                    
                   navigate(`/home/product/${id}`)
                })
            }

          


        }catch(er){console.log(er);
        }

    }


    return (
        <div>
            <ToastContainer/>
            <h2>Products</h2>
            <div>
                {loader ?
                    <div className="text-center mt-5 mb-5 ">
                        <Loder />
                    </div> :
                    <div className="container mb-5 pb-5 ">
                        <div className="row d-flex justify-content-between">
                            {products.length != 0 &&
                                products.map((val: any, i: number) => {
                                    return (
                                        <div onClick={()=>openproduct(val.id)} key={i} className={`${style.card} col-md-3 col-sm-5 d-flex flex-column justify-content-between border rounded-4 mt-3 shadow ms-1`}>
                                            <div className={`${style.crdimg}`}>
                                                <img src={val.images[0]} />
                                            </div>
                                            <div>
                                                <h4>{val.title}</h4>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h6>Rs: {val.price}</h6>
                                                    <p className="text-warning">Rating: {val.rating}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}