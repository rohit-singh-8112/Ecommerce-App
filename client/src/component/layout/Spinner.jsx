import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = () => {
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((current)=> --current)
        },1000);
        count===0 && navigate("/Login",{state:location.pathname});
        return ()=>clearInterval(interval);
    },[count, navigate, location]);
  return (
    <>
        <div className="d-flex flex-column justify-content-center align-items-center "style={{height:"100vh"}}>
            <h1 className='text-center'>Redirecting to you in {count} secound</h1>
            <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </>
  )
}

export default Spinner