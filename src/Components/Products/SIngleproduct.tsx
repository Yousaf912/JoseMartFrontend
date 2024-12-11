import { useDispatch, useSelector } from "react-redux"
import { Header } from "../Header/Header"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loder } from "../Loader"
import style from './Product.module.css'
import { IoPersonCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify"
import { setTriger } from "../ReduxStore/ReduxSlice/tokenslice"
import { Footer } from "../Footer/Footer"


export const SingleProduct = () => {
    const [loader, setloader] = useState(true);
    const [product, setProduct] = useState<any>({});
    const [img, setimg] = useState();
    const productid = useParams();
    const dispatch = useDispatch();
    const triger = useSelector((state:any)=>state.triger.triger)

    const getSingleProduct = async () => {
        try {
            const prodct = await fetch(`http://localhost:3000/getproduct/${productid.id}`);
            const fnal = await prodct.json();
            setProduct(fnal.product)
            setimg(fnal.product.thumbnail)
            setloader(false)

        } catch (er) {
            console.log(er);
        }
    }

    useEffect(() => {
        getSingleProduct()
    }, [])

    const changeimg = (url: any) => {
        setimg(url)
    }

    const addtocart = async (id: any,img:any,sku:any,price:any,size:any,title:any,) => {
        const obj = {
            productId: id,
            quentity: 1,
            title,
            size,
            price,
            sku,
            img,
            
        }
        const userid = localStorage.getItem('userid');
        if (!userid) {
            toast.error('plase first login')
        } else {
            try {
                const addproduct = await fetch(`http://localhost:3000/addproduct/${userid}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj)
                })
                const data = await addproduct.json();
                if(addproduct.ok){
                    toast.success(data.message);
                    dispatch(setTriger(!triger))
                }else{
                    toast.error(data.message)
                }
                
            } catch (er) {
                console.log(er);
            }
        }
    }

    return (
        <div>
            <Header />

            {
                loader ?
                    <div className={`${style.loder} text-center  `}>
                        <Loder />
                    </div> :
                    <div className={`${style.main} mb-5`}>
                        <div className="container">
                            <div className="row  ">
                                <div className="d-lg-flex justify-content-between align-items-center ">
                                    <div className="col-lg-4 mb-4 mb-lg-0 ">
                                        <div className={`${style.thumbnail}  text-center `}>
                                            <img src={img} className="border-primary" />
                                        </div>
                                        <div className="d-flex  justify-content-around ">
                                            {
                                                product.images.lenth != 0 &&
                                                product.images.map((url: any, i: number) => {
                                                    return (
                                                        <img onClick={() => changeimg(url)} className={`${img == url && style.picborder} ${style.imgs}`} key={i} src={url} width={100} />
                                                    )
                                                })
                                            }
                                        </div>



                                    </div>
                                    <div className="col-lg-6 ">
                                        <h1>{product.title}</h1>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex justify-content-between">
                                                <p>Rating: </p>
                                                <span className="ms-2 text-warning">{product.rating}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <p>Brand: </p>
                                                <span className="ms-2 text-danger"> {product.brand}</span>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center mb-2">
                                            <h6>Catagory : </h6>
                                            <h5 className="ms-2">{product.category}</h5>
                                        </div>
                                        <h3>Price: ${product.price}</h3>
                                        <h5 className="mt-4">About this item :</h5>
                                        <p >{product.description}</p>
                                        <div>
                                            <button onClick={() => addtocart(product.id,product.thumbnail,product.sku,product.price,product.weight,product.title)} className={`${style.btn} text-white rounded-3 py-2 px-3 mb-3`}>Add to Cart</button>
                                        </div>
                                        <div >
                                            <h6 className=" border-bottom border-2 pb-2" >More Details : </h6>
                                            <div className="d-flex">
                                                <h6>Weight :</h6>
                                                <p className="ms-2">{product.weight}</p>
                                            </div>
                                            <div className="d-flex">
                                                <h6>stock :</h6>
                                                <p className="ms-2">{product.stock}</p>
                                            </div>
                                            <div className="d-flex">
                                                <h6>sku :</h6>
                                                <p className="ms-2">{product.sku}</p>
                                            </div>
                                            <div className="d-flex">
                                                <h6>shippingInformation :</h6>
                                                <p className="ms-2">{product.shippingInformation}</p>
                                            </div>
                                            <div className="d-flex">
                                                <h6>returnPolicy :</h6>
                                                <p className="ms-2">{product.returnPolicy}</p>
                                            </div>
                                            <div className="d-flex">
                                                <h6>warrantyInformation :</h6>
                                                <p className="ms-2">{product.warrantyInformation}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 border-top">
                                <h1>Reviews : </h1>
                                {product.reviews.map((rev: any, i: number) => {
                                    return (
                                        <div key={i} className="mt-5">
                                            <div className="d-flex align-items-center">
                                                <IoPersonCircleOutline className="fs-1 text-danger" />
                                                <h6>
                                                    {rev.reviewerName}
                                                </h6>
                                            </div>
                                            <div className="d-flex align-items-center ">
                                                <h6>rating: {rev.rating}</h6>
                                                <p className="ms-5 mt-1"> review at {rev.date}</p>
                                            </div>
                                            <p>"{rev.comment}"</p>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>

                    </div>
            }
            <Footer/>
        </div>
    )
}
