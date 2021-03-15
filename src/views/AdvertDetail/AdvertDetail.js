import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { getAdvert } from "../../service/advert.service"

const AdvertDetail = () => {
    console.log(useParams())
    const {advertId} = useParams()

    const [state,setState] = useState({})

    const getAdvertLoQueSea = async () => {
        const {data} = await getAdvert(advertId)
        setState(data)
    }
    console.log(state);
    useEffect(()=>{
        getAdvertLoQueSea()
    },[])

    return ( <h1>AdvertDetail</h1> );
}
 
export default AdvertDetail;