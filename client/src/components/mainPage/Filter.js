import React, {useCallback, useEffect, useState} from "react";
import {Button, FormControl, FormLabel} from "react-bootstrap";
import axios from "../../API";
import {useAlert} from "react-alert";


export const Filter = ({getItems, setItems}) => {
    const alert = useAlert()
    const [data, setData] = useState(null)
    const [reqData, setReqData] = useState({
        'minPrice': -1, 'maxPrice': -1, 'minSize': -1, 'maxSize': -1, 'city': '', 'items': []
    })


    const getData = useCallback(async () => {
        const response = await axios.get('/api/filter')
        setData(response.data)
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    const checkInputData = () => {
        const minPrice = document.getElementById('minPrice')
        const maxPrice = document.getElementById('maxPrice')
        const minSize = document.getElementById('minSize')
        const maxSize = document.getElementById('maxSize')
        const city = document.getElementById('city')
        const arr = [minPrice, maxPrice, minSize, maxSize]

        arr.forEach(element => {
            if (element.value < 1) element.value = ''
        })
        if (city.value === ' ') city.value = ''
    }

    const changeInputData = event => {
        checkInputData()
        setReqData({...reqData, [event.target.id]: event.target.value})
    }

    const setValue = () => {
        const items = getItems()
        for (let [key, value] of Object.entries(reqData)) {
            if (key!=='city' && key!=='items'){
                if (value === -1 || value === '') reqData[key] = data[key]
                else reqData[key] = Number.parseInt(value)
            }
            if (key==='items') reqData[key] = items
        }

    }

    const filter = async () => {
        setValue()
        const response = await axios.post('/api/filter', {...reqData})
        if (response.data.message) {
            alert.error(response.data.message + ', so we left the result of the previous search')
        }
        else {
            setItems(response.data.items)
        }
    }

    if (!data) return <div>loading...</div>

    return (
        <div>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-2">
                    <FormLabel
                        style={{'marginTop': '10px'}}
                    >Price</FormLabel>
                </div>
                <div className="col-4">
                    <FormControl
                        id='minPrice'
                        type="number"
                        placeholder={`min (${data.minPrice})`}
                        className="mr-sm-1"
                        onChange={changeInputData}
                    />
                </div>
                <div className="col-4">
                    <FormControl
                        id='maxPrice'
                        type="number"
                        placeholder={`max (${data.maxPrice})`}
                        className="mr-sm-1"
                        onChange={changeInputData}
                    />
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-2">
                    <FormLabel
                        style={{'marginTop': '10px'}}
                    >Size</FormLabel>
                </div>
                <div className="col-4">
                    <FormControl
                        id='minSize'
                        type="number"
                        placeholder={`min (${data.minSize})`}
                        className="mr-sm-1"
                        onChange={changeInputData}
                    />
                </div>
                <div className="col-4">
                    <FormControl
                        id='maxSize'
                        type="number"
                        placeholder={`max (${data.maxSize})`}
                        className="mr-sm-1"
                        onChange={changeInputData}
                    />
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-2">
                    <FormLabel
                        style={{'marginTop': '10px'}}
                    >City</FormLabel>
                </div>
                <div className="col-4">
                    <FormControl
                        id='city'
                        as="select"
                        defaultValue="Choose city ..."
                        onChange={changeInputData}
                    >
                        <option disabled>Choose city ...</option>
                        {data.cities.map(city => {
                            return <option value={city}>{city}</option>
                        })}
                    </FormControl>
                </div>
                <div className="col-1"></div>
                <div className="col-4">
                    <Button
                        variant="success"
                        onClick={filter}
                    >Filter</Button>
                </div>
            </div>


        </div>
    )
}