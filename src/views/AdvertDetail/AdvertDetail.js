import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getAdvert,
  likedAdvert,
  unLikedAdvert,
} from "../../service/advert.service";
import Loading from "../../components/Loading/Loading";
import {
  Holster,
  Carousel,
  AdvertWrapPhoto,
  AdvertPhoto,
  ChatBtn,
  CarouselData,
  DataIcon,
  HolsterData,
  OptionsBar,
} from "./styles";
import Modal from "./Modal";
import { CgCalendarDates } from "react-icons/cg";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  IoColorFillOutline,
  IoLocationOutline,
  IoSpeedometerOutline,
  IoWaterOutline,
} from "react-icons/io5";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { GrManual } from "react-icons/gr";
import { BsGear } from "react-icons/bs";

const AdvertDetail = ({ handleRenderNav }) => {
  const { advertId } = useParams();
  const history = useHistory();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [like, setLike] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  const getAdvertLoQueSea = async () => {
    const { data } = await getAdvert(advertId);
    setState(data);
    setLoading(true);
  };
  const handleOnClick = async (advertId) => {
    if (like) {
      await unLikedAdvert(advertId);
    } else {
      await likedAdvert(advertId);
    }
    setLike(!like);
  };

  const goBack = () => {
    handleRenderNav();
    history.push("/coches-clasicos");
  };

  useEffect(() => {
    getAdvertLoQueSea();
    handleRenderNav();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <OptionsBar
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <IoIosArrowRoundBack
              size={50}
              style={{ marginLeft: "10px" }}
              onClick={goBack}
            />
            <span
              onClick={() => {
                handleOnClick(advertId);
              }}
            >
              {like ? (
                <FcLike size={30} style={{ marginRight: "10px" }} />
              ) : (
                <FcLikePlaceholder size={30} style={{ marginRight: "10px" }} />
              )}
            </span>
          </OptionsBar>
          <section style={{ position: "relative", top: "-100px" }}>
            <AdvertWrapPhoto>
              <Holster>
                <Carousel>
                  <div style={{ display: "flex" }}>
                    {state.image.map((item, idx) => (
                      <div key={item}>
                        <AdvertPhoto onClick={openModal} alt="" src={item} />
                      </div>
                    ))}
                  </div>
                </Carousel>
              </Holster>
            </AdvertWrapPhoto>
            <div>
              <p className=" margin10 advertPrice">{state.price} €</p>
              <h1 className=" margin10 advertTitle">
                {state.brand} {state.model}
              </h1>
            </div>
            <div className="flexColumn">
              <HolsterData>
                <CarouselData>
                  <section
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <DataIcon>
                      <CgCalendarDates size={40} />
                      <p>{state.year}</p>
                    </DataIcon>
                    <DataIcon>
                      <IoSpeedometerOutline size={40} />
                      <p>{state.km}</p>
                    </DataIcon>
                    <DataIcon>
                      <IoLocationOutline size={40} />
                      <p>{state.address}</p>
                    </DataIcon>
                    <DataIcon>
                      <GrManual size={40} />
                      <p>{state.typeOfTransmision}</p>
                    </DataIcon>
                    <DataIcon>
                      <BsGear size={40} />
                      <p>{state.horsePower}</p>
                    </DataIcon>
                    <DataIcon>
                      <IoColorFillOutline size={40} />
                      <p>{state.color}</p>
                    </DataIcon>
                    <DataIcon>
                      <IoWaterOutline size={40} />
                      <p>{state.fuel}</p>
                    </DataIcon>
                  </section>
                </CarouselData>
              </HolsterData>
            </div>
            <div>
              <h3 className="margin10" style={{ marginLeft: "20px" }}>
                Más información
              </h3>
              <div className="boxShadow margin10">
                <p className="padding10">{state.otherInformation}</p>
              </div>
            </div>
            <div>
              <h3 className="margin10" style={{ marginLeft: "20px" }}>
                Datos del anunciante
              </h3>
              <div className="margin10">
                <p className="padding10">{state.user.email}</p>
              </div>
            </div>
            {showModal && <Modal img={state.image} openModal={openModal} />}
            <ChatBtn>Contactar</ChatBtn>
          </section>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AdvertDetail;
