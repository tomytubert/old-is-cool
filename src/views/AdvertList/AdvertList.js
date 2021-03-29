import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import AdvertCard from "../../components/AdvertCard/AdvertCard";
import Loading from "../../components/Loading/Loading";
import { getAdverts } from "../../service/advert.service";
import { getUser } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext.utils";

const AdvertList = ({ handleRenderNavYes, adverts }) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedAdverts, setLikedAdverts] = useState([]);
  const { user } = useAuth();

  const getAllAdverts = async () => {
    const { data } = await getAdverts();
    setState(data);
    setLoading(true);
  };

  const getUserInfo = async () => {
    const { data: userInfo } = await getUser();
    setLikedAdverts(userInfo.likedAdverts);
  };

  useEffect(() => {
    handleRenderNavYes();
    if (user.isLogged) {
      getUserInfo().then(() => getAllAdverts()); 
    } else {
      getAllAdverts();
    }
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
          {adverts && adverts[0] ? (
            <>
              {adverts.map((item, idx) => (
                <AdvertCard
                  key={item._id}
                  props={item}
                  likedAdverts={likedAdverts}
                  userIsLogged={user.isLogged}
                />
              ))}
            </>
          ) : (
            <>
              {state.length > 1 &&
                state.map((item, idx) => (
                  <AdvertCard
                    key={item._id}
                    props={item}
                    likedAdverts={likedAdverts}
                    userIsLogged={user.isLogged}
                  />
                ))}
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

AdvertList.defaultProps = {
  handleRenderNavNone: () => {
    return false
  },
  adverts: []
}

AdvertList.propTypes = {
  handleRenderNavYes: PropTypes.func,
  adverts: PropTypes.arrayOf(
    PropTypes.shape({
      typeOfCar: PropTypes.string.isRequired,
      image:PropTypes.arrayOf(PropTypes.string).isRequired,
      brand:PropTypes.string.isRequired ,
      year:PropTypes.string.isRequired ,
      fuel:PropTypes.string ,
      model:PropTypes.string.isRequired ,
      horsePower:PropTypes.number ,
      color:PropTypes.string ,
      otherInformation:PropTypes.string ,
      typeOfTransmision:PropTypes.string ,
      km:PropTypes.number ,
      fromWhere:PropTypes.string ,
      price:PropTypes.number ,
      address:PropTypes.string ,
      user:PropTypes.string.isRequired ,
      soldOut: PropTypes.bool
    })
  ),
}
export default AdvertList;
