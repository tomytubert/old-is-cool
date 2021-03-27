import React, { useEffect, useState } from "react";
import AdvertCard from "../../components/AdvertCard/AdvertCard";
import { getAdverts } from "../../service/advert.service";
import { getUser } from "../../service/auth.service";
import Loading from "../../components/Loading/Loading";
import { useAuth } from "../../context/AuthContext.utils";


const AdvertList = ({ handleRenderNavYes, adverts }) => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedAdverts,setLikedAdverts]=useState([])
  const { user } = useAuth();

  const getAllAdverts = async () => {
    const { data } = await getAdverts();
    setState(data);
    setLoading(true);
  };

  const getUserInfo = async () => {
    const { data:userInfo } = await getUser()
    setLikedAdverts(userInfo.likedAdverts)
  }

  useEffect(() => {
    handleRenderNavYes();
    if(user.isLogged){
      getUserInfo().then(()=>getAllAdverts())//Esta linea en heroku da error Hay que pensar que cuando no estás logeado esto rompe
    }
    getAllAdverts() 
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
                <AdvertCard key={item._id} props={item} likedAdverts={likedAdverts} userIsLogged={user.isLogged}/>
              ))}
            </>
          ) : (
            <>
              {state.length > 1 &&
                state.map((item, idx) => (
                  <AdvertCard key={item._id} props={item} likedAdverts={likedAdverts} userIsLogged={user.isLogged}/>
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

export default AdvertList;
