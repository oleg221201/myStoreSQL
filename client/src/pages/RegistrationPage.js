import React, {useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import axios from '../API'
import {useAlert} from 'react-alert'


export const RegistrationPage = () => {
    const auth = useContext(AuthContext)
    const [data, setData] = useState({
        email: '', username: '', password: ''
    })
    const alert = useAlert()

    const register = async () => {
        try {
            await axios.post('/api/auth/registration', {...data}).then(regData => {
                if (regData.data.message){
                    if(regData.data.err){
                        regData.data.err.forEach(err => {
                            alert.error(err.msg)
                        })
                    }
                    else {
                        alert.error(regData.data.message)
                    }
                }
                else {
                    auth.login(regData.data.token, regData.data.userId)
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
            <h3>Registration</h3>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" name="email" onChange={changeHandler}
                       placeholder="Enter email"/>
            </div>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" name="username" onChange={changeHandler}
                       placeholder="Come up with username"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" onChange={changeHandler}
                       placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={register}>Submit</button>
        </div>
    )
}