import { useEffect, useState } from "react"
import { Header } from "../Header/Header"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loder } from "../Loader";
import style from './Product.module.css'


export const AllProductsPage = () => {
    const [category, setCatgeory] = useState([]);
    const categoryname = useParams();
    const naigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const [products, setproducts] = useState([]);
    const location = useLocation().pathname.split("/")[2];
   

    const getCategory = async () => {
        try {
            await fetch('http://localhost:3000/getcatagory').then(async (res) => {
                const data = await res.json()
                setCatgeory(data.allCategories)
            })
        } catch (er) {
            console.log(er);
        }
    }

    const getProducts = async () => {
        if(location != 'products'){
            
            try {
                await fetch(`http://localhost:3000/searchproduct/${location}`).then(async (res) => {
                    const fnal = await res.json();
                    setproducts(fnal.prodyct.products);
                    setLoader(false)
                })
    
            } catch (er) {
                console.log(er);
            }
        }else{

            try {
                await fetch(`http://localhost:3000/getproductbycategory/${categoryname.catagory}`).then(async (res) => {
                    const fnal = await res.json();
                    setproducts(fnal.products);
                    setLoader(false)
                })
    
            } catch (er) {
                console.log(er);
            }
        }
    }

    useEffect(() => {
        setLoader(true)
        getProducts()
    }, [categoryname])

    useEffect(() => {
        getCategory()
    }, [])

    const changecategory = (name: any) => {
        naigate(`/home/products/${name}`)
    }

    const openproduct=(id:any)=>{
        naigate(`/home/product/${id}`)
    }


    return (
        <div className="">
            <Header />`
        
            <div className={`mt-5 pt-5 d-md-flex ${products.length !== 0 && 'justify-content-between' } `}>
                <div className="category col-md-3 col-lg-2 ">
                    {category.length == 0 ?
                        <div>
                            <Loder />
                        </div> :
                        <div className="ps-1">
                            <h2>Categories : </h2>
                            <ul className="">
                                <div className="border px-3 rounded-3">
                                    {category.map((val: any, i: number) =>
                                        <li onClick={() => changecategory(val.slug)} key={i} className={`${categoryname.catagory == val.slug && style.active}  ${style.lst} py-1 mt-1 px-2 rounded-3 text-center`} >{val.name}</li>
                                    )}
                                </div>
                            </ul>
                        </div>
                    }
                </div>
                {
                products.length == 0 ?
                <div className=" col-9 text-center mt-5">
                    <h1>No data found</h1>
                </div>:
            
                <div className="products col-lg-9">
                    <div className="container">
                        <div className="row">

                            {loader ?
                                <div className=" text-center">
                                    <Loder />
                                </div> :
                                <div>
                                     <div className="container mb-5 pb-5 ">
                        <div className="row d-flex justify-content-between">
                            {products.length != 0 &&
                                products.map((val: any, i: number) => {
                                    return (
                                        <div onClick={()=>openproduct(val.id)} key={i} className={`${style.card} col-sm-5 col-lg-3 d-flex flex-column justify-content-between border rounded-4 mt-3 shadow ms-1`}>
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

                                </div>
                            }

                        </div>
                    </div>

                </div>}
            </div>
            {/* <Footer/> */}
        </div>
    )
}