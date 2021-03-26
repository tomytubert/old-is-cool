import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { findUser } from "../../service/auth.service";
import { PhotoInput } from "../AdvertDetail/styles";
import { getPurchasesSeller } from "../../service/purchases.service";
import {
  ProfilePhoto,
  CameraICon,
  ProfilePhotoIcon,
  BtnTab,
  EditContainer,
  ProfilePhotoUpDate,
} from "./style";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { OptionsBar } from "../AdvertDetail/styles";
import { CloseIcon, Icon } from "../../components/Layout/style";
import { Btn } from "../HomePage/style";
import Loading from "../../components/Loading/Loading";
import {
  Holster,
  CarouselHomePage,
  AdvertWrapPhoto,
} from "../AdvertDetail/styles";
import AdvertCard from "../../components/AdvertCard/AdvertCard";
import { uploadFile } from "../../service/advert.service";
import { update } from "../../service/auth.service";

const Profile = ({ handleRenderNavNone, handleRenderNavYes }) => {
  // const { user } = useAuth();
  const { userId } = useParams();

  const history = useHistory();
  const initialState = {
    name: "",
    email: "",
    password: "",
    rating: 0,
    img: "",
    address: "",
    likeAdverts: 0,
    adverts: [],
    sells: 0,
  };
  const initialStateUpdate = {
    name: "",
    email: "",
    img: "",
    address: "",
  };
  const [soldOut, setSoldOut] = useState(false);
  const [profile, setProfile] = useState(initialState);
  const [profileUpdate, setProfileUpdate] = useState(initialStateUpdate);
  const [opinions, setOpinions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdverts, setShowAdverts] = useState(true);
  const [showOpinions, setShowOpinions] = useState(false);

  const showContent = () => {
    setShowAdverts(!showAdverts);
    setShowOpinions(!showOpinions);
  };

  const getSellsInfo = async () => {
    const { data } = await getPurchasesSeller(userId);
    setOpinions(data);
  };

  const getProfileInfo = async () => {
    const { data } = await findUser(userId);
    console.log("data", data);
    setProfile({
      ...profile,
      type: data.type,
      email: data.email,
      adverts: data.adverts,
      img: data.img,
      name: data.name,
      address: data.address,
      sells: data.sells.length,
    });
    setProfileUpdate({
      ...profileUpdate,
      email: data.email,
      img: data.img,
      name: data.name,
      address: data.address,
    });
    setLoading(true);
  };
  const handleChangeUpdate = (e) => {
    if (e.target) {
      setProfileUpdate({ ...profileUpdate, [e.target.name]: e.target.value });
    }
  };

  const goBack = () => {
    history.goBack();
    handleRenderNavYes();
  };

  const handleUpload = async (e) => {
    try {
      const uploadData = new FormData();
      //fileReader()
      uploadData.append("image", e.target.files[0]);

      const { data } = await uploadFile(uploadData);

      setProfileUpdate({ ...profileUpdate, img: data });
    } catch (e) {
      console.error(e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update(profileUpdate);
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    handleRenderNavNone();
    getProfileInfo();
    getSellsInfo();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <OptionsBar
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <IoIosArrowRoundBack
              size={50}
              style={{ marginLeft: "10px" }}
              onClick={goBack}
            />
            <div>
              <FiEdit
                size={30}
                style={{ marginRight: "10px" }}
                onClick={handleToggle}
              />
            </div>
          </OptionsBar>
          <section>
            <div className="colorBoxProfile" />
            <div className="boxShadowBottom infoBoxProfile">
              <div style={{ height: "130px", width: "130px" }}>
                <ProfilePhoto>
                  {profile.img ? (
                    <ProfilePhotoIcon src={profile.img} />
                  ) : (
                    <CameraICon style={{ marginTop: "25%" }} size={50} />
                  )}
                </ProfilePhoto>
              </div>
              <div className="flexColumn">
                <h3>{profile.name ? profile.name : "Name"}</h3>
                <p
                  style={{ fontSize: "17px", padding: " 10px 0" }}
                  className="softGreenP"
                >
                  {profile.type}
                </p>
                <div className="ratingBoxProfile">
                  <div className="margin10">
                    <p style={{ fontSize: "17px" }} className="softGreenP">
                      Rating
                    </p>
                    <p>{profile.rating}</p>
                  </div>
                  <div className="margin10">
                    <p style={{ fontSize: "17px" }} className="softGreenP">
                      Ventas
                    </p>
                    <p>{profile.sells}</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "50px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <BtnTab onClick={showContent}>Mis Anuncios</BtnTab>
                  </div>
                  <div>
                    <BtnTab onClick={showContent}>Opiniones</BtnTab>
                  </div>
                </div>
              </div>
              {showAdverts && (
                <AdvertWrapPhoto>
                  <Holster>
                    <CarouselHomePage>
                      <div style={{ display: "flex" }}>
                        {profile.adverts.map((item, idx) => (
                          <div key={item._id}>
                            <AdvertCard props={item} />
                          </div>
                        ))}
                      </div>
                    </CarouselHomePage>
                  </Holster>
                </AdvertWrapPhoto>
              )}
              {showOpinions && (
                <>
                  {opinions.map((opinion, idx) => (
                    <div
                      style={{
                        display: "flex",
                        padding: "15px",
                        margin: "5px",
                      }}
                      className="boxShadow"
                    >
                      <div>
                        <PhotoInput>
                          {opinion.buyer.img ? (
                            <img
                              alt={opinion.buyer.img}
                              src={opinion.buyer.img}
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
                        <div>
                          <p
                            className="margin10"
                          >
                            {opinion.opinion}
                          </p>
                        </div>
                        <Link
                          to={`/profile/${opinion.buyer._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div>
                            <p 
                            className="margin10"
                            style={{ fontSize: "17px", color: "grey" }}
                            >
                              Por {opinion.buyer.email}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>
          <EditContainer isOpen={isOpen}>
            <Icon>
              <CloseIcon style={{ color: "#3e4643" }} onClick={handleToggle} />
            </Icon>
            <form
              onSubmit={handleSubmit}
              className="flexColumn"
              style={{ margin: "40% 10px" }}
            >
              <div
                style={{ height: "130px", width: "130px", marginLeft: "34%" }}
              >
                <ProfilePhotoUpDate
                  style={{ padding: "0", width: "100px", height: "100px" }}
                >
                  {profileUpdate.img ? (
                    <ProfilePhotoIcon src={profileUpdate.img} />
                  ) : (
                    <CameraICon style={{ marginTop: "25%" }} size={50} />
                  )}
                  <input type="file" name="img" onChange={handleUpload} />
                </ProfilePhotoUpDate>
              </div>
              <label htmlFor="nombre" className="margin10 lineBottom">
                Nombre
              </label>
              <input
                placeholder={profile.name ? profile.name : "Eduardo*"}
                type="text"
                name="name"
                onChange={handleChangeUpdate}
                value={profileUpdate.name}
                className="margin10 width70vw leftMargin18"
              />
              <label htmlFor="nombre" className="margin10 lineBottom">
                Direccion
              </label>
              <input
                placeholder={
                  profile.address ? profile.address : "43820,Calafell*"
                }
                type="text"
                name="address"
                onChange={handleChangeUpdate}
                value={profileUpdate.address}
                className="margin10 width70vw leftMargin18"
              />
              <label htmlFor="email" className="margin10 lineBottom">
                Email
              </label>
              <input
                placeholder={profile.email}
                type="email"
                name="email"
                onChange={handleChangeUpdate}
                value={profileUpdate.email}
                className="margin10 width70vw leftMargin18"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Btn type="submit">Editar</Btn>
              </div>
            </form>
          </EditContainer>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;
