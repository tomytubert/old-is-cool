import React, { useEffect, useState } from "react";
import AdvertCard from "../../components/AdvertCard/AdvertCard";
import { getAdverts } from "../../service/advert.service";
import Loading from "../../components/Loading/Loading";

const AdvertList = ({ handleRenderNavYes }) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllAdverts = async () => {
    const { data } = await getAdverts();
    setState(data);
  };

  useEffect(() => {
    handleRenderNavYes();
    getAllAdverts();
    setLoading(true)
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            paddingBottom: "100px",
          }}
        >
          {state.length > 1 &&
            state.map((item, idx) => (
              <AdvertCard key={item._id} props={item} />
            ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AdvertList;
