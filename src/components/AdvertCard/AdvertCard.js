import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Advert,AdvertInformation,AdvertWrapPhoto,AdvertTitle,AdvertOtherInformation,AdvertPhoto} from "./styles"

const AdvertCard = ({ props }) => {
  const initialState = {
    num: 0,
    img: props.image[0],
  };

  const [state, setState] = useState(initialState);

  const handleClickRight = () => {
    let position = state.num + 1;
    if (position <= props.image.length - 1) {
      setState({ num: position, img: props.image[position] });
    }
  };
  const handleClickLeft = () => {
    let position = state.num - 1;
    if (position >= 0) {
      setState({ num: position, img: props.image[position] });
    }
  };
  return (
    <>
      <Advert>
        <AdvertWrapPhoto>
          {/* <button onClick={handleClickLeft}>Left</button> */}
          <Link
            to={`/coches-clasicos/${props.brand}-${props.model}-${props.year}/${props._id}`}
          >
            <AdvertPhoto alt="" src={state.img} />
          </Link>
          {/* <button onClick={handleClickRight}>Rigth</button> */}
        </AdvertWrapPhoto>

        <AdvertInformation>
          <AdvertTitle>
            <h3>
              {props.brand} {props.model}
            </h3>
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
