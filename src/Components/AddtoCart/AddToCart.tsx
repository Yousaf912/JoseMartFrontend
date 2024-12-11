import { useEffect, useState } from "react"
import { Header } from "../Header/Header"
import { Loder } from "../Loader";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import { CgRemoveR } from "react-icons/cg";
import style from './addtocart.module.css'
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setTriger } from "../ReduxStore/ReduxSlice/tokenslice";
import { useNavigate } from "react-router-dom";

export const AddtoCart = () => {
    const userid = localStorage.getItem('userid');
    const [cartdata, setCartData] = useState<any>([]);
    const [loder, setLoader] = useState(true);
    const [qn, setQn] = useState(false);
    const [subtotal, setSubtotal] = useState<number>(0);
    let tax = 20;
    let total = tax+subtotal
    
    const triger = useSelector((state:any)=>state.triger.triger)
    const dispatch=useDispatch();
    const navigate = useNavigate()

    const getCartData = async () => {
        try {
            await fetch(`http://localhost:3000/getcartdata/${userid}`)
                .then(async (res) => {
                    const data = await res.json();
                    await setCartData(data.products);
                    setLoader(false);
                })
                .catch((er) => {
                    console.log(er);
                })
        } catch (er) {
            console.log(er);
        }
    }


    const calculateSubtotal = (cartdata: any[]) => {
        const total = cartdata.reduce((acc, item) => {
            return acc + (Number(item.price) * Number(item.quentity));
        }, 0);
        setSubtotal(total);
    }

    const increaseQuentity = async (id: any, quantity: any, action: any) => {
        try {
            let quentity = action === 'inc' ? Number(quantity) + 1 : Math.max(1, Number(quantity) - 1);
            const obj = { quentity };
            const userid = localStorage.getItem("userid");
            if (!userid) {
                toast.error('First login');
            }

            fetch(`http://localhost:3000/increase/${userid}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(async (res) => {
                const fnal = await res.json();
                if (fnal.message === 'updated') {
                    setQn(!qn);
                }
            });
        } catch (er) {
            console.log(er);
        }
    }

    const deleteProduct = async (productid: any) => {
        try {
            const userid = localStorage.getItem('userid');
            fetch(`http://localhost:3000/delete/${userid}/${productid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(async (res) => {
                const fnal = await res.json();

                if (fnal.message == 'poduct is deleted') {
                    dispatch(setTriger(!triger))
                    setQn(!qn);
                }
            });
        } catch (er) {
            console.log(er);
        }
    }


    useEffect(() => {
        getCartData();
    }, [qn]);

    useEffect(() => {
        if (cartdata.length > 0) {
            calculateSubtotal(cartdata);
        }
    }, [cartdata]);

    const openproduct=(id:any)=>{
        navigate(`/home/product/${id}`)
    }

    return (
        <div>
            <ToastContainer />
            <Header />
            {
                loder ?
                    <div className="text-center" style={{ paddingTop: '10%' }}>
                        <Loder />
                    </div> :
                    <div className="px-5  d-md-flex justify-content-between" style={{ paddingTop: '10%' }}>
                        <div className="col-md-8 pt-5 pt-md-0">
                            {
                                cartdata.length !== 0 ?
                                    <>
                                        {cartdata.map((val: any, i: number) => {
                                            return (
                                                <div key={i} className=" d-sm-flex justify-content-between  border mt-3 shadow border-2 p-2 rounded-4">
                                                    <div style={{cursor:'pointer'}} onClick={()=>openproduct(val.productId)} className="d-flex col-6 ">
                                                        <img src={val.img} width={100} />
                                                        <div className="ms-2 ">
                                                            <h5>{val.title}</h5>
                                                            <p>Size: {val.size}</p>
                                                            <p>SKU: {val.sku}</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex col-6  justify-content-around mt-3">

                                                        <div className=" d-flex flex-column justify-content-between ">
                                                            <h6>Quantity</h6>
                                                            <h5>{val.quentity}</h5>
                                                            <div className="button d-flex ">
                                                                <CiSquarePlus onClick={() => increaseQuentity(val._id, val.quentity, 'inc')} className={`${style.btn} fs-3`} />
                                                                <h6 className="px-3">{val.quentity}</h6>
                                                                <CgRemoveR onClick={() => increaseQuentity(val._id, val.quentity, 'dec')} className={`${style.btn} fs-3`} />
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-column justify-content-between align-items-center">
                                                            <div className="delete">
                                                                <RiDeleteBin2Fill onClick={() => deleteProduct(val._id)} className={`${style.delete} fs-2`} />
                                                            </div>
                                                            <h5 className="text-danger">${(val.price * val.quentity).toFixed(2)}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div className="d-flex justify-content-between border-top border-2 pt-2 border-black mt-5 mb-5">
                                            <h6>{cartdata.length} Items</h6>
                                            <div>
                                                <h6>
                                                    Subtotal: ${subtotal.toFixed(2)}
                                                </h6>
                                            </div>
                                        </div>
                                    </> :
                                    <div className="text-center text-danger">
                                        <h1>Cart is empty</h1>
                                    </div>
                            }
                        </div>
                        <div className="col-md-3 mt-3 ">
                            <div className="container border border-2 rounded-3 shadow p-3 text-center ">
                                <h5 className="text-danger">Order Summary</h5>
                                <div className="d-flex justify-content-between mt-4">
                                    <h6>Subtotal : </h6>
                                    <h6>$ {subtotal.toFixed(2)}</h6>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <h6>Estimated TAX : </h6>
                                    <h6>$00</h6>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <h6>Estimated Shipping : </h6>
                                    <h6>${tax}</h6>
                                </div>
                                <div className="border-top border-2 mt-3 pt-2 d-flex justify-content-between">
                                    <h6>Total</h6>
                                    <h6>
                                        $ {total.toFixed(2)}
                                    </h6>
                                </div>
                                <button className={`${style.paybtn} py-1 px-3 rounded-2 `}>Pay Now</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
