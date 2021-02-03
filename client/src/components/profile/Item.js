import React from "react";
import {Link} from "react-router-dom";


export const Item = ({data}) => {
    return (
        <div>
            <Link to={`/item/${data.id}`}>{data.item_name}</Link>
        </div>
    )
}