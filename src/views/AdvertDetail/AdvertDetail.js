import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types"
import { getLocalUser } from "../../context/AuthContext.utils";
import {
  getAdvert,
  likedAdvert,
  unLikedAdvert,
  contactAdvert,
} from "../../service/advert.service";
import { createPurchases } from "../../service/purchases.service";
import { sell } from "../../service/auth.service";
import Loading from "../../components/Loading/Loading";
import Modal from "./Modal";
import { EditContainer } from "../Profile/style";
import { CameraICon, SmallPhotoIcon } from "../SellCar/style";
import { CloseIcon, Icon } from "../../components/Layout/style";
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
  PhotoInput,
  SoldOutModal,
  AcceptsSoldOut,
  DeclineSoldOut,
} from "./styles";
import { GiTakeMyMoney } from "react-icons/gi";
import { CgCalendarDates } from "react-icons/cg";
import { MdDone } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  IoColorFillOutline,
  IoLocationOutline,
  IoSpeedometerOutline,
  IoWaterOutline,
} from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { GrManual } from "react-icons/gr";
import { BsGear } from "react-icons/bs";

const AdvertDetail = ({ handleRenderNavNone }) => {
  const user = getLocalUser();
  const { advertId } = useParams();
  const history = useHistory();
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [contacted, setContacted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [soldOut, setSoldOut] = useState(false);
  const [like, setLike] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [colorTick, setColorTick] = useState(false);
  const [soldOutModal, setSoldOutModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };
  const openSoldOutModal = () => {
    setSoldOutModal(!soldOutModal);
  };
  const getAdvertLoQueSea = async () => {
    const { data } = await getAdvert(advertId);
    setState(data);

    data.contacts.forEach((item, idx) => {
      if (item === user.id) {
        setContacted(true);
      }
    });

    if (data.soldOut) {
      setSoldOut(true);
    }
    setLoading(true);
  };
  const sellCar = async (buyer) => {
    await sell(advertId);
    await createPurchases(buyer);
    history.push(`/profile/${user.id}`);
  };
  const contactCar = async () => {
    await contactAdvert(advertId);
    history.push(`/profile/${user.id}`);
  };
  const handleOnClick = async (advertId) => {
    if (like) {
      await unLikedAdvert(advertId);
    } else {
      await likedAdvert(advertId);
    }
    setLike(!like);
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleToggleColor = () => {
    setColorTick(!colorTick);
  };
  const verifyAuth = () => (state.user._id === user.id ? true : false);

  const goEditRoute = () => {
    history.push(`/editar/${advertId}`);
  };

  const notLoggedGoLogin = () => {
    history.push("/login")
  }

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    getAdvertLoQueSea();
    handleRenderNavNone();
  }, []);
  
  return (
    <>
      {loading ? (
        <>
          <OptionsBar
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "sticky",
            }}
          >
            <IoIosArrowRoundBack
              size={50}
              style={{ marginLeft: "10px" }}
              onClick={goBack}
            />

            {verifyAuth() ? (
              <>
                {!soldOut && (
                  <FiEdit
                    size={30}
                    style={{ marginRight: "10px" }}
                    onClick={goEditRoute}
                  />
                )}
              </>
            ) : (
              <span
                onClick={() => {
                  if(user.id){
                    handleOnClick(advertId);
                  } else {
                    notLoggedGoLogin();
                  }
                }}
              >
                {like ? (
                  <FcLike size={30} style={{ marginRight: "10px" }} />
                ) : (
                  <FcLikePlaceholder
                    size={30}
                    style={{ marginRight: "10px" }}
                  />
                )}
              </span>
            )}
          </OptionsBar>
          <section style={{ position: "relative", top: "-5px" }}>
            <AdvertWrapPhoto>
              <Holster>
                <Carousel>
                  <div style={{ display: "flex" }}>
                    {state.image.map((item, idx) => (
                      <div key={item}>
                        <AdvertPhoto onClick={openModal} alt="" src={item} />
                        {soldOut && (
                          <GiTakeMyMoney className="sellIcon" size={30} />
                        )}
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
                      <p>{state.km}km</p>
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
                      <p>{state.horsePower}cv</p>
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
                <p
                  className="padding10"
                  style={{ wordWrap: "wrap", wordBreak: "break-all" }}
                >
                  {state.otherInformation}
                </p>
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
            {verifyAuth() ? (
              <>
                {!soldOut && (
                  <ChatBtn 
                    onClick={() => {
                      handleToggle();
                    }}
                  >
                    Vendido
                  </ChatBtn>
                )}
              </>
            ) : (
              <>
                {!soldOut && (
                  <>
                    {!contacted && (
                      <ChatBtn 
                        onClick={() => {
                          contactCar();
                        }}
                      >
                        Contactar
                      </ChatBtn>
                    )}
                  </>
                )}
              </>
            )}
          </section>
          <EditContainer isOpen={isOpen}>
            <Icon>
              <CloseIcon
                style={{ color: "#3e4643" }}
                onClick={() => {
                  handleToggle();
                }}
              />
            </Icon>
            <div style={{ marginTop: "30%" }}>
              {state.contacts.map((contact, idx) => (
                <div
                  id="messageSoldOutRow"
                  className="boxShadow"
                >
                  <div>
                    <PhotoInput>
                      {contact.img ? (
                        <SmallPhotoIcon
                          src={contact.img}
                          style={{
                            marginTop: "10%",
                            marginLeft: "10%",
                          }}
                        />
                      ) : (
                        <CameraICon
                          size={50}
                          style={{
                            marginTop: "10%",
                            marginLeft: "8%",
                          }}
                        />
                      )}
                    </PhotoInput>
                  </div>
                  <div className="flexColumn">
                    <div>
                      <p className="margin10">{contact.type}</p>
                    </div>
                    <Link
                      to={`/profile/${contact._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div>
                        <p className="margin10">{contact.email}</p>
                      </div>
                    </Link>
                  </div>
                  <div style={{ marginLeft: "15px" }}>
                    <MdDone
                      size={40}
                      onClick={() => {
                        handleToggleColor();
                        openSoldOutModal();
                      }}
                      style={
                        colorTick ? { color: "#08a045",position:"relative",left:"-10px" } : { color: "#3e4643",position:"relative",left:"-10px" }
                      }
                    />
                  </div>
                  <SoldOutModal isOpen={soldOutModal}>
                    <div
                      className="boxShadow flexColumn"
                      id="soldOutModalBox"
                    >
                      <div>
                        <PhotoInput id="photoModalSoldOut">
                          {contact.img ? (
                            <SmallPhotoIcon
                              src={contact.img}
                              style={{
                                width: "150px",
                                height: "150px",
                              }}
                            />
                          ) : (
                            <CameraICon size={80} />
                          )}
                        </PhotoInput>
                      </div>
                      <div style={{ marginTop: "-85px" }}>
                        <p>
                          ¿Estás seguro de que se lo has vendido ha{" "}
                          {contact.email}?
                        </p>
                      </div>
                      <div style={{ margin: "20px 0" }}>
                        <AcceptsSoldOut 
                        className="margin10"
                        onClick={()=>{
                          sellCar(contact._id)
                        }}
                        >
                          Si,se lo he vendido
                        </AcceptsSoldOut>
                        <DeclineSoldOut
                          className="margin10"
                          onClick={() => {
                            openSoldOutModal();
                            handleToggleColor();
                          }}
                        >
                          No se lo he vendido
                        </DeclineSoldOut>
                      </div>
                    </div>
                  </SoldOutModal>
                </div>
              ))}
            </div>
          </EditContainer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

AdvertDetail.defaultProps = {
  handleRenderNavNone: () => {
    return false
  }
}
AdvertDetail.propTypes = {
  handleRenderNavNone: PropTypes.func
}
export default AdvertDetail;
