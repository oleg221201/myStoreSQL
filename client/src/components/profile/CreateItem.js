import React, {useState, useCallback, useContext} from 'react'
import {Button, FormControl, FormLabel} from "react-bootstrap";
import {AuthContext} from "../../context/AuthContext";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import axios from "../../API";

export const CreateItem = () => {
	const history = useHistory()
	const alert = useAlert()
	const {token} = useContext(AuthContext)
	const [item, setItem] = useState({name: '', price: '',
            size: '', city: ''})

	const checkChanges = event => {
		if (document.getElementById('name').value === ' '){
			document.getElementById('name').value = ''
		}
		if (document.getElementById('price').value < 1){
			document.getElementById('price').value = ''
		}
		if (document.getElementById('size').value < 1){
			document.getElementById('size').value = ''
		}
		if (document.getElementById('city').value === ' '){
			document.getElementById('city').value = ''
		}
	}

	const changeHandler = event => {
		checkChanges()
		setItem({...item, [event.target.id]: event.target.value})
	}

	const create = useCallback(async () => {
		const arr = ['name', 'price', 'size', 'city']
		for (let i=0; i<arr.length; i++){
			if(document.getElementById(arr[i]).value === '') {
				alert.error('There is empty input')
				return
			}
		}

		const response = await axios.post('/api/item', {...item}, {
			headers: {'Authorization': `Bearer ${token}`}
		})

		alert.success(response.data.message)
		history.push(`/item/${response.data.itemId}`)
	}, [token, alert, history, item])

	return (
		<div className='row'>
			<div className="col-1"></div>
			<div className="col-11">
				<div className="row">
					<div className="col-5">
						<div>
							<FormLabel>
								Item name:
							</FormLabel>
							<FormControl
								type='text'
								id='name'
								onChange={changeHandler}
							/>
						</div>
					</div>
					<div className="col-5">
						<div>
							<FormLabel>
								Item price (<span>&#8372;</span>):
							</FormLabel>
							<FormControl
								type='number'
								id='price'
								min={1}
								onChange={changeHandler}
							/>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-5">
						<div>
							<FormLabel>
								Item size:
							</FormLabel>
							<FormControl
								type='number'
								id='size'
								min={1}
								onChange={changeHandler}
							/>
						</div>
					</div>
					<div className="col-5">
						<div>
							<FormLabel>
								Item city:
							</FormLabel>
							<FormControl
								type='text'
								id='city'
								onChange={changeHandler}
							/>
						</div>
					</div>
				</div>
				<br/>
				<Button
					onClick={create}
				>Create</Button>
			</div>
		</div>
	)
}