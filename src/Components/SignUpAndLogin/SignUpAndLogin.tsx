
import {  useLocation, useNavigate } from 'react-router-dom'
import { Header } from '../Header/Header'
import style from './SignUpLOgin.module.css'
import img1 from '../../assets/signup.png'
import img2 from '../../assets/signup2.png'
import { CgProfile } from "react-icons/cg";
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'



const SignUplOGIN = () => {
    const location = useLocation().pathname.split("/")[1];
    const [erors, setErors] = useState<any>({})
    const [data, setdata] = useState({
        name: '',
        mail: '',
        number: '',
        password: ''
    })
    const navigate = useNavigate();

    const openlink = (name: any) => {
        navigate(name)
    }

    const getData = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setdata({
            ...data,
            [name]: value
        })
    }

    const signup = async () => {
        try {
            await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(async (res) => {
                const dta = await res.json();
                if (dta.errors) {
                    setErors(dta.errors)
                } else if (res.status == 400) {
                    toast.error(dta.message)
                }
                if (res.ok) {
                    toast.success(dta.message)
                    setdata(
                        {
                            name: '',
                            mail: '',
                            number: '',
                            password: ''
                        }
                    )
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                }

            }).catch((er) => {
                console.log(er);
            })

        } catch (er) {
            console.log(er);
        }
    }


    const login = async () => {
        try {
            const res = await fetch('http://localhost:3000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mail: data.mail,
                    password: data.password
                })
            })
            const dta = await res.json();
           
            if (!res.ok) {
                toast.error(dta.message)
            }
            else {

                await localStorage.setItem('token', dta.usertoken);
                await localStorage.setItem('userid',dta.user._id)
                navigate('/home')
            }
        } catch (er) {
            console.log(er);

        }
    }

    return (
        <div className={style.main}>
            <ToastContainer />
            <Header />
            <div className={`container mb-5 pt-5`}>
                <div className="row">
                    <div className="col-12 d-md-flex mt-4 align-items-center">
                        <div className={`${style.imgsection} col-md-6`}>
                            <img src={location == 'signup' ? img1 : img2} className={style.img} />
                        </div>
                        <div className={`${style.textsection} col-md-6 px-5  p-3 rounded-4 text-white`}>
                            <div className='text-center'>
                                <CgProfile className={`${style.profile}`} />
                                <h2>{location == 'signup' ? 'Signup' : 'Login'}</h2>
                            </div>
                            {location == 'signup' &&
                                <div className='mb-2'>
                                    <div className='d-flex flex-column mt-3'>
                                        Name:
                                        <input value={data.name} onChange={getData} name='name' className='p-2 rounded-3' type="text" placeholder='Enter your name' required />
                                        {erors.name && <h6 className='text-danger'>{erors.name.message}</h6>}
                                    </div>
                                    <div className='d-flex flex-column mt-3'>
                                        Number:
                                        <input value={data.number} onChange={getData} name='number' className='p-2 rounded-3' type="number" placeholder='Enter your number' required />
                                        {erors.number && <h6 className='text-danger'>{erors.number.message}</h6>}
                                    </div>

                                </div>
                            }
                            <div className='d-flex flex-column'>
                                Email Address:
                                <input value={data.mail} onChange={getData} name='mail' className='p-2 rounded-3' type="email" placeholder='enter email' required />
                                {erors.mail && <h6 className='text-danger'>{erors.mail.message}</h6>}
                            </div>
                            <div className='d-flex flex-column mt-3'>
                                Password:
                                <input value={data.password} onChange={getData} name='password' className='p-2 rounded-3' type="password" placeholder='Enter Password' required />
                                {erors.password && <h6 className='text-danger'>{erors.password.message}</h6>}
                            </div>
                            <div className='mt-4 text-center'>
                                {
                                    location == 'signup' ?
                                        <button onClick={signup} className='px-3 py-1 rounded-3'>Signup</button>
                                        :
                                        <button onClick={login} className='px-3 py-1 rounded-3'>Login</button>
                                }
                                <a onClick={() => openlink(location == 'signup' ? '/login' : '/signup')} className='ms-4 text-white '>{location == 'signup' ? 'Login' : 'Signup'}</a>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUplOGIN