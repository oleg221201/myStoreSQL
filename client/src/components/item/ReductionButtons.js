import React, {useCallback} from "react";
import {useHistory} from "react-router-dom";
import axios from '../../API'
import {useAlert} from "react-alert";


export const ReductionButtons = ({itemId}) => {
    const history = useHistory()
    const alert = useAlert()

    const edit = () => {
        history.push(`/editItem/${itemId}`)
    }

    const del = useCallback(async () => {
        const response = await axios.delete(`/api/item/${itemId}`)

        alert.success(response.data.message)
        history.push('/profile')
    },[itemId, alert, history])

    return (
        <div>
            <button
                style={{'backgroundColor': '#f19d31', 'color': 'white'}}
                onClick={edit}
            >Edit</button>
            <button
                style={{'backgroundColor': '#ff2222', 'color': 'white'}}
                onClick={del}
            >Delete</button>
        </div>
    )
}