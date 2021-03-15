import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdvertCard = ({ props }) => {
  console.log("image", props.image);
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
      <div>
        <div>
          <button onClick={handleClickLeft}>Left</button>
          <Link
            to={`/coches-clasicos/${props.brand}-${props.model}-${props.year}/${props._id}`}
          >
            <img alt="" src={state.img} />
          </Link>
          <button onClick={handleClickRight}>Rigth</button>
        </div>

        <div>
          <div>
            <h3>
              {props.brand} {props.model}
            </h3>
            <p>{props.price}</p>
          </div>
          <p>
            {props.year} · {props.fuel} · {props.km}
          </p>
        </div>
      </div>
    </>
  );
};

export default AdvertCard;
