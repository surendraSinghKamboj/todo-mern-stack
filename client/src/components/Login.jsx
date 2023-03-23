
import axios from 'axios'
import React, { useState } from 'react'


const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        const res = await axios.post("http://localhost:4000/api/v1/user/login", data);
        console.log(res)
    }

    return (
        <div className='w-[90vw] sm:w-[80vw] h-[80vh] m-auto flex-col bg-slate-300 rounded-2xl flex justify-center items-center'>
            <input type="text" name='email' placeholder='Enter your email id' className='mt-3' onChange={handleChange} />
            <input type="password" name='password' placeholder='Enter your password' className='mt-3' onChange={handleChange} />
            <button className='mt-3' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login