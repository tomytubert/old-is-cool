import React, { useEffect, useState } from "react";
import { getUser, updateRating } from "../../service/auth.service";
import { getPurchases, updatePurchases } from "../../service/purchases.service";
import { Link, useParams, useHistory } from "react-router-dom";
import { PhotoInput, SoldOutModal } from "../AdvertDetail/styles";
import { Btn } from "../HomePage/style";
import { CameraICon, SmallPhotoIcon } from "../SellCar/style";
import { CloseIcon, Icon } from "../../components/Layout/style";
import Loading from "../../components/Loading/Loading";
const Messages = () => {
  const initialState = {
    rating: 0,
    opinion: "",
  };

  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [opinionModal, setOpinionModal] = useState(false);
  const [opinion, setOpinion] = useState(initialState);
  const { userId } = useParams();
  const history = useHistory();

  const handleChange = (e) => {
    if (e.target) {
      setOpinion({ ...opinion, [e.target.name]: e.target.value });
    }
  };

  const openOpinionModal = () => {
    setOpinionModal(!opinionModal);
  };

  const sendOpinion = async (sellerId) => {
    const userOpinion = await updatePurchases(userId, opinion);
  };

  const updateSellerRating = async (sellerId) => {
    const userRating = await updateRating(sellerId,opinion.rating)
  }
  const getUserData = async () => {
    const { data } = await getUser();
    setAdverts(data.adverts);
    setLoading(true);
  };

  const handleSubmitOpinion = (e) => {
    e.preventDefault();
    sendOpinion();
    history.push(`/profile/${userId}`);
  };

  const getUserPurchases = async () => {
    const { data } = await getPurchases(userId);
    setPurchases(data);
  };

  useEffect(() => {
    getUserData();
    getUserPurchases();
  }, []);
  return (
    <>
      {loading ? (
        <>
          <h1
            style={{
              paddingBottom: "10px",
              marginBottom: "30px",
              boxShadow: " 0px 0px 8px -4px #777",
              color: "black",
            }}
          >
            Mensajes
          </h1>
          {adverts.map((advert, idx) => (
            <>
              {advert.contacts &&
                advert.contacts.map((item, idx) => (
                  <div
                    style={{ display: "flex", padding: "15px", margin: "5px" }}
                    className="boxShadow"
                  >
                    <div>
                      <PhotoInput>
                        {advert.image[0] ? (
                          <img
                            alt={
                              advert.model +
                              " " +
                              advert.brand +
                              " " +
                              advert.year
                            }
                            src={advert.image[0]}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "20%",
                            }}
                          />
                        ) : (
                          <CameraICon
                            size={50}
                            style={{ marginTop: "10%", marginLeft: "8%" }}
                          />
                        )}
                      </PhotoInput>
                    </div>
                    <Link
                      to={`/profile/${item._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div>
                        <p className="margin10">
                          {item.email} se ha interesado por tu coche
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </>
          ))}
          {purchases.map((item, idx) => (
            <>
              <div
                style={{ display: "flex", padding: "15px", margin: "5px" }}
                className="boxShadow"
              >
                <div>
                  <PhotoInput>
                    {item.seller.img ? (
                      <img
                        alt={item.seller.img}
                        src={item.seller.img}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "20%",
                        }}
                      />
                    ) : (
                      <CameraICon
                        size={50}
                        style={{ marginTop: "10%", marginLeft: "8%" }}
                      />
                    )}
                  </PhotoInput>
                </div>
                <div className="flexColumn">
                  <Link
                    to={`/profile/${item.seller._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div>
                      <p className="margin10">
                        {item.seller.email} te ha vendido su coche
                      </p>
                    </div>
                  </Link>
                  {!item.opinion && (
                    <div className="margin10" style={{ textAlign: "center" }}>
                      <Btn onClick={openOpinionModal} style={{ width: "auto" }}>
                        Valorar
                      </Btn>
                    </div>
                  )}
                </div>
              </div>
              <SoldOutModal isOpen={opinionModal}>
                <Icon>
                  <CloseIcon
                    style={{ color: "#3e4643" }}
                    onClick={() => {
                      openOpinionModal();
                    }}
                  />
                </Icon>
                <div
                  className="boxShadow flexColumn margin10"
                  style={{
                    position: "absolute",
                    top: "20%",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <PhotoInput id="photoModalSoldOut">
                      {item.seller.img ? (
                        <SmallPhotoIcon
                          src={item.seller.img}
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
                    <form
                      onSubmit={
                        handleSubmitOpinion
                      }
                      className="flexColumn margin10"
                    >
                      <label
                        htmlFor="Valoracion"
                        className="margin10 lineBottom"
                      >
                        Valoración
                      </label>
                      <input
                        placeholder={"Del 1 al 10"}
                        type="number"
                        name="rating"
                        onChange={handleChange}
                        value={opinion.rating}
                        className="margin10 width70vw"
                      />
                      <label
                        htmlFor="Otra-informacion"
                        className="margin10 lineBottom"
                      >
                        ¿Cuentanos que tal ha sido la compra?
                      </label>
                      <textarea
                        placeholder={"Resume en pocas palabras como ha ido"}
                        name="opinion"
                        cols="30"
                        rows="10"
                        onChange={handleChange}
                        value={opinion.opinion}
                        className="margin10 width70vw"
                      />
                      <div style={{ margin: "20px 0" }}>
                        <Btn type="submit" onClick={()=>{updateSellerRating(item.seller._id)}} className="margin10">
                          Valorar
                        </Btn>
                      </div>
                    </form>
                  </div>
                </div>
              </SoldOutModal>
            </>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Messages;
