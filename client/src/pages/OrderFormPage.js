import React, {useCallback, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from "../API";
import {useAlert} from "react-alert";
import {Button, FormControl,FormCheck ,FormLabel} from "react-bootstrap";
import {useCart} from "../hooks/cart.hook";
import {useUserInfo} from "../hooks/userInfo.hook";


export const OrderFormPage = () => {
    const {info, addInfo, deleteInfo} = useUserInfo()
    const {deleteItem} = useCart()
    const history = useHistory()
    const alert = useAlert()
    const itemId = useParams().itemId
    const [data, setData] = useState({itemId: itemId, clientName: "",
        clientEmail: "", count: 0, clientCity: ""})

    const checkChanges = event => {
        if (document.getElementById('clientName').value === ' '){
            document.getElementById('clientName').value = ''
        }
        if (document.getElementById('clientEmail').value === ' '){
            document.getElementById('clientEmail').value = ''
        }
        if (document.getElementById('count').value < 1){
            document.getElementById('count').value = ''
        }
        if (document.getElementById('clientCity').value === ' '){
            document.getElementById('clientCity').value = ''
        }
    }

    const changeHandler = event => {
        checkChanges()
        setData({...data, [event.target.id]: event.target.value})
    }

    const createOrder = useCallback(async () => {
        const arr = ['clientName', 'clientEmail', 'count', 'clientCity']
        for (let i=0; i<arr.length; i++){
            if(document.getElementById(arr[i]).value === '') {
                alert.error('There is empty input')
                return
            }
        }

        if (document.getElementById('checkbox').checked) {
            addInfo(data.clientName, data.clientEmail, data.clientCity)
        }

        const response = await axios.post('/api/item/order', {...data})

        if (response.data.message){
            if(response.data.err){
                response.data.err.forEach(err => {
                    alert.error(err.msg)
                })
            }
            else {
                alert.success(response.data.message)
                deleteItem(itemId)
                history.push('/')
            }
        }
    }, [data, alert, history, deleteItem, itemId, addInfo])


    return (
        <div className='row m-3'>
            <div className="col-5">
                <h3>Send an order</h3>
                <div>
                    <FormLabel>
                        Your name:
                    </FormLabel>
                    <FormControl
                        type="text"
                        id='clientName'
                        defaultValue={info.name}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <FormLabel>
                        Your email:
                    </FormLabel>
                    <FormControl
                        type="text"
                        id='clientEmail'
                        defaultValue={info.email}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <FormLabel>
                        Count:
                    </FormLabel>
                    <FormControl
                        type="number"
                        id='count'
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <FormLabel>
                        City:
                    </FormLabel>
                    <FormControl
                        type="text"
                        id='clientCity'
                        defaultValue={info.city}
                        onChange={changeHandler}
                    />
                </div>
                <br/>
                <div className="row">
                    <div className="col-4">
                        <Button
                            onClick={createOrder}
                        >Send an order</Button>
                    </div>
                    <div className="col-4 mt-2">
                        <FormCheck id="checkbox" type="checkbox" label="Remember me"/>
                    </div>
                </div>
                <br/>
                <button onClick={deleteInfo}>Forget me</button>
            </div>
        </div>
    )
}