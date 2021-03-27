import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { likedAdvert, unLikedAdvert } from "../../service/advert.service";
import { getUser } from "../../service/auth.service";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import {
  Advert,
  AdvertInformation,
  AdvertWrapPhoto,
  AdvertTitle,
  AdvertOtherInformation,
  AdvertPhoto,
  Holster,
  Carousel,
} from "./styles";

const AdvertCard = ({ props, likedAdverts, userIsLogged }) => {
  const [likeToggle, setLikeToggle] = useState(false);
  const history = useHistory();
  const userLikedAdvert = async (advertId) => {
    await likedAdvert(advertId);
  };
  const userUnLikedAdvert = async (advertId) => {
    await unLikedAdvert(advertId);
  };
  
  const handleOnClick = (advertId) => {
    if (likedAdverts && userIsLogged) {
      if(likedAdverts.length === 0){
        userLikedAdvert(advertId);
        setLikeToggle(true);
      }
      likedAdverts.forEach((like, idx) => {
        if (like === advertId) {
          userUnLikedAdvert(advertId);
          setLikeToggle(false);
        }

        if (like !== advertId) {
          userLikedAdvert(advertId);
          setLikeToggle(true);
        }
      });
    } else {
      history.push("/login");
    }
  };

  const likedOrNot = (like, advertId) => {
    if (like === advertId) {
      setLikeToggle(true);
    }
  };

  const toggleColorLike = (advertId) => {
    if (likedAdverts) {
      likedAdverts.map((item) => likedOrNot(item, advertId));
    }
  };

  useEffect(() => {
    toggleColorLike(props._id);
  }, []);

  return (
    <>
      <Advert>
        <AdvertWrapPhoto>
          <Holster>
            <Carousel>
              <div style={{ display: "flex" }}>
                {props.image.map((item, idx) => (
                  <div key={item}>
                    <Link
                      to={`/coches-clasicos/${props.brand}-${props.model}-${props.year}/${props._id}`}
                    >
                      <AdvertPhoto alt="" src={item} />
                      {props.soldOut && (
                        <GiTakeMyMoney className="sellIconCard" size={30} />
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </Carousel>
          </Holster>
        </AdvertWrapPhoto>
        <AdvertInformation>
          <AdvertTitle>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ maxWidth: " 200px" }}>
                {props.brand} {props.model}
              </h3>
              <span
                onClick={() => {
                  handleOnClick(props._id);
                }}
              >
                {likeToggle ? (
                  <FcLike size={30} style={{ margin: "0 15px" }} />
                ) : (
                  <FcLikePlaceholder size={30} style={{ margin: "0 15px" }} />
                )}
              </span>
            </div>

            <p>{props.price}€</p>
          </AdvertTitle>
          <AdvertOtherInformation>
            {props.year} · {props.fuel} · {props.km}km
          </AdvertOtherInformation>
        </AdvertInformation>
      </Advert>
    </>
  );
};

export default AdvertCard;
