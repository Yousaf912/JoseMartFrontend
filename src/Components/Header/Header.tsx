import {  useNavigate } from 'react-router-dom';
import style from './Header.module.css'
import { TiShoppingCart } from "react-icons/ti";
import { FaCartPlus } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from 'react';
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';


export const Header = () => {
    const navigation = useNavigate();
    const [islogin, setisLogin] = useState(false);
    const inputvalue = useRef<any>('');
    const [cartdata, setCartdata] = useState(0)
    const triger = useSelector((store: any) => store.triger.triger);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token != null) {
            setisLogin(true)
        }
    }, [])


    const openlink = (name: any) => {
        navigation(name)
    }

    const searchProduct = () => {
        const querry = inputvalue.current.value;
        const fnal = querry.replace(/\s+/g, '');
        if (!querry) {
            toast.error('Please type something')
        } else {
            navigation(`/searchProduct/${fnal}`)
        }
    }



    const getCartData = async () => {
        const userid = localStorage.getItem('userid')
        if (userid) {
            try {
                await fetch(`http://localhost:3000/getcartdata/${userid}`).then(async (res) => {
                    const fnal = await res.json();
                    setCartdata(fnal.products.length)

                })
            } catch (er) {
                console.log(er);
            }
        }
    }

    useEffect(() => {
        getCartData()
    }, [triger])


    return (
        <div className={`${style.main} container-fluid pt-3 position-fixed bg-white `}>
            <ToastContainer />
            <div className="container-fluid">
                <div className="row d-flex justify-content-between align-items-center">
                    <div className="text-black  col-5 col-sm-4  col-md-3 col-xl-2 d-flex justify-content-evenly  align-items-center">
                        <TiShoppingCart className={`fs-1`} style={{ color: '#f7444e' }} />
                        <h2 style={{ cursor: 'pointer' }} onClick={() => openlink('/home')} >Jose.<span style={{ color: "#f7444e" }}>M</span>art</h2>
                    </div>
                    <div className='col-12 col-md-6 order-1 order-md-0  '>
                        <div className={`${style.serch}  border border-black d-flex justify-content-between rounded-5  `}>
                            <input ref={inputvalue} className=' ms-3' type="text" placeholder='Serach items here .....' />
                            <button onClick={searchProduct} className=''><ImSearch className='fs-3' />
                            </button>
                        </div>
                    </div>
                    <div className="col-4 col-sm-3   col-md-2 col-lg-3  col-xl-2 ">
                        <div className="row">
                            {islogin &&
                                <div className="col-7  text-end">
                                    <button type="button" className={`position-relative border-0 ${style.cart}`}>
                                        <FaCartPlus className={`fs-3 ${style.hovr}`} onClick={() => openlink('/home/addtocart')} />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {cartdata}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </button>
                                </div>}
                            <div className='col-5'>
                                {islogin ? <IoPersonCircleOutline className={`fs-2 ${style.hovr}`} /> : <button onClick={() => openlink('/login')} className={`border-0 px-4 py-1 rounded-3 ${style.loginbtn}`}>Login</button>
                                }

                            </div>
                        </div>
                    </div>

                  

                </div>
            </div>
        </div>
    )
}