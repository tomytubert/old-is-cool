import React, { useEffect, useState } from "react";
import AdvertCard from "../../components/AdvertCard/AdvertCard";
import { getAdverts,findAdverts } from "../../service/advert.service";

const AdvertList = () => {
  const [state, setState] = useState([]);

  const getAllAdverts = async () => {
    const { data } = await getAdverts();
    setState(data);
  };


  // const {brand,year,price,fromWhere} = filter

  // const filterAdverts = async (brand,year,price,fromWhere) => {
  //   await findAdverts(brand,year,price,fromWhere)
  // }

  useEffect(() => {
    getAllAdverts();
  }, []);

  return (
    <div style={{display:"flex",justifyContent:"space-evenly",flexWrap:"wrap",paddingBottom:"100px"}}>
      {state.length > 1 && state.map((item, idx) => (
        <AdvertCard key={item._id} props={item} />
      ))}
    </div>
  );
};

export default AdvertList;
