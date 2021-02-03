import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {OrderButtons} from "../item/OrderButtons";
import {ReductionButtons} from "../item/ReductionButtons";
import {AuthContext} from "../../context/AuthContext";


export const Item = ({data}) => {
    const {userId} = useContext(AuthContext)
    const checkBtn = (item) => {
        if (userId === item.userid) {
            return (<ReductionButtons itemId={item.id}/>)
        }
        else {
            return (<OrderButtons itemId={item.id}/>)
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <Link to={`/item/${data.id}`}
                          style={{'fontSize': '30pt'}}
                    >{data.item_name}</Link>
                    <p>{data.city}</p>
                    <p>{data.updatedAt.substring(11, 16)} {data.updatedAt.substring(0, 10)}</p>
                </div>
                <div className="col-8">
                    <br/>
                    {checkBtn(data)}
                </div>
            </div>
            <hr/>
        </div>
    )
}