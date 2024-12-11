import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Header } from '../Header/Header'
import style from './home.module.css'
import { useEffect, useState } from "react";
import img1 from '../../assets/baner1.png'
import img2 from '../../assets/baner2.jpg'
import img4 from '../../assets/baner4.jpg'


import cat1 from '../../assets/beauty.jpg'
import cat2 from '../../assets/fragrence.jpg'
import cat3 from '../../assets/furniture.jpg'
import cat4 from '../../assets/grocery.png'
import cat5 from '../../assets/homedecore.jpeg'
import cat6 from '../../assets/kitchecn.jpg'
import cat7 from '../../assets/laptop.jpg'
import cat8 from '../../assets/manshirt.jpg'
import cat9 from '../../assets/manshoes.jpg'
import cat10 from '../../assets/watch.jpg'
import cat11 from '../../assets/bikes.jpg'
import { HomeProducts } from "./Homeproducts";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Footer/Footer";



export const Home = () => {
    const [catagoryName, setCatagoryName] = useState([])
    const [showcatagory, setshowCatagory] = useState(false);
    const [img, setImg] = useState(0);
    const navigate = useNavigate()

    const CatagoryImgs = [cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10, cat11]

    const getCatagory = async () => {
        try {
            await fetch('https://jose-mart-backend.vercel.app/getcatagory').then(async (res) => {
                const data = await res.json()
                setCatagoryName(data.allCategories)
            })


        } catch (er) {
            console.log(er);
        }
    }

    

    useEffect(() => {
        getCatagory();
      
    }, [])

    const imgs = [img1, img2, img4];
    const pic = imgs[img]

    setTimeout(() => {
        if ((imgs.length - 1) != img) {
            setImg(img + 1)
        } else {
            setImg(0)
        }
    }, 4000);


    const opencatagory=(name:any)=>{
        navigate(`/home/products/${name}`)
    }

  
    return (
        <div >
            <Header />
            <div className={`${style.home}  `}>
                <div className="container pt-5 pt-md-0">
                    <div className="row pt-5 pt-md-4 pt-lg-0">
                        <div className="d-md-flex flex-row">
                            <div className="col-lg-2 col-6 position-relative">
                                <div className="d-flex justify-content-around  ">
                                    <h6>ALL CATEGORIES</h6>
                                    <div className={`${style.catagory}`} onClick={() => setshowCatagory(!showcatagory)}>
                                        {
                                            showcatagory ?
                                                <IoIosArrowUp className="fs-4" /> :
                                                <IoIosArrowDown className="fs-4" />
                                        }
                                    </div>
                                </div>
                                {
                                    showcatagory &&
                                    <div className="position-absolute   bg-white border border-danger px-1 rounded-2 ">
                                        {catagoryName.length !== 0 &&
                                            catagoryName.map((val: any) => {
                                                return (
                                                    <ul className={`${style.list}`}>
                                                        <li onClick={()=>opencatagory(val.slug)} >{val.name}</li>
                                                    </ul>
                                                )
                                            })
                                        }
                                    </div>}
                            </div>
                            <div className={` col-md-10 d-none d-md-block `}>
                                <div className={`d-flex flex-row flex-wrap justify-content-between ${style.list}`}>
                                    {catagoryName.length !== 0 &&
                                        catagoryName.slice(0, 8).map((val: any, i: number) => {
                                            return (
                                                <li onClick={()=>opencatagory(val.slug)} key={i}>{val.name}</li>
                                            )
                                        })
                                    }
                                </div>
                            </div>


                        </div>
                    </div>
                    {/* --------------------------------------------Slider -------------------------------------------- */}

                    <div className={`${style.baner} mt-3`}>
                        <img src={pic} />
                    </div>

                    {/* -------------------------------------------- catagory ------------------------------ */}
                    <div className="mt-3">
                        <h4>All Categories</h4>

                        <div>
                            <div className="d-flex  mb-5  flex-wrap justify-content-between ">
                                {catagoryName.length !== 0 &&
                                    catagoryName.slice(0, 11).map((val: any, i: number) => (
                                        <div onClick={()=>opencatagory(val.slug)} key={i} className={`${style.category} ms-5 text-center`}>
                                            <div className={`${style.catimg}`}>
                                                <img src={`${CatagoryImgs[i]}`} />
                                            </div>
                                            <h6>{val.name}</h6>
                                        </div>
                                    ))
                                }
                            </div>



                        </div>

                    </div>
                    <HomeProducts />
                    <Footer/>






                </div>




            </div>
        </div >


    )
}