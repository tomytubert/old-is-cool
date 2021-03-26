import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

const AdvertCard = ({ props }) => {
  const [like, setLike] = useState(false);

  const handleOnClick = async (advertId) => {
    if (like) {
      await unLikedAdvert(advertId);
    } else {
      await likedAdvert(advertId);
    }
    setLike(!like);
  };

  const likedAdvertData = async () => {
    const { data } = await getUser();
    data.likedAdverts.forEach((id) => {
      if (id === props._id) {
        setLike(true);
      } else {
        setLike(false);
      }
    });
  };

  useEffect(() => {
    likedAdvertData();
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
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <h3>
                {props.brand} {props.model}
              </h3>
              <span
                onClick={() => {
                  handleOnClick(props._id);
                }}
              >
                {like ? (
                  <FcLike size={30} style={{}} />
                ) : (
                  <FcLikePlaceholder size={30} style={{}} />
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
