import React, {useCallback, useState} from "react";
import {Button, FormControl} from "react-bootstrap";
import axios from "../../API";


export const Search = ({setItems}) => {
    const [inputData, setInputData] = useState('')

    const checkInputData = () => {
        if (document.getElementById('searchText').value === ' ')
            document.getElementById('searchText').value = ''
    }

    const changeInputData = async event => {
        checkInputData()
        setInputData(event.target.value)
    }

    const enterPress = async event => {
        if (event.key === 'Enter') {
            setInputData(document.getElementById('searchText').value)
            document.getElementById('btn').click()
        }
    }

    const search = useCallback(async () => {
        const items = await axios.get('/api/filter/search', {params: {text: inputData}})
        setItems(items.data.searchItems)
    }, [inputData, setItems])

    return (
        <div className='row'>
            <div className="col-9">
                <FormControl
                    id='searchText'
                    type="text"
                    placeholder="Search an item"
                    className="mr-sm-1"
                    onChange={changeInputData}
                    onKeyPress={enterPress}
                />
            </div>
            <div className="col-3">
                <Button
                    id='btn'
                    variant="outline-success"
                    onClick={search}
                >Search</Button>
            </div>
        </div>
    )
}