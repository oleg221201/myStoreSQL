import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import axios from '../API'
import {useAlert} from 'react-alert'



export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const [data, setData] = useState({
        email: '', password: ''
    })
    const alert = useAlert()

    const login = async () => {
        try {
            await axios.post('/api/auth/login', {...data}).then(loginData => {
                if (loginData.data.message){
                    if(loginData.data.err){
                        loginData.data.err.forEach(err => {
                            alert.error(err.msg)
                        })
                    }
                    else {
                        alert.error(loginData.data.message)
                    }
                }
                else {
                    auth.login(loginData.data.token, loginData.data.userId)
                    window.location.reload(false)
                }
            })
        } catch (e) {}
    }

    function changeHandler (event) {
        setData({...data, [event.target.name]: event.target.value})
    }

    return (
        <div>
        	<h3>Log in</h3>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" name="email" onChange={changeHandler}
                       placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" onChange={changeHandler}
                       placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={login}>Submit</button>
        </div>
    )
}