import React, { useEffect, useState } from "react";
import AdvertCard from "../../components/AdvertCard/AdvertCard";
import { getAdverts } from "../../service/advert.service";

const AdvertList = () => {
  const [state, setState] = useState([]);
  const getAllAdverts = async () => {
    const { data } = await getAdverts();
    setState(data);
  };

  useEffect(() => {
    getAllAdverts();
  }, []);

  return (
    <>
      {state.map((item, idx) => (
          <AdvertCard key={item._id} props={item} />
      ))}
    </>
  );
};

export default AdvertList;
