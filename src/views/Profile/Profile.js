import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.utils";
import {getUser} from "../../service/auth.service"
const Profile = ({handleRenderNav}) => {
  const { user } = useAuth();
  const initialState = {
    name: "",
    email: "",
    password: "",
    rating: 0,
    img: "",
    address: "",
    likeAdverts: 0,
  };
  const [profile, setProfile] = useState(initialState);

  const getProfileInfo = async (user) => {
    const {data} = await getUser(user)
    console.log(data);
  }

  useEffect(() => {
    getProfileInfo(user)
    handleRenderNav()
  }, []);

  return (
    <>
      <section>
        <div style={{ display: "flex" }}>
          <div>
            <img alt="" />
          </div>
          <div className="flexColumn">
            <h3>Name</h3>
            <p>Particular/Empresa</p>
            <p>Rating</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
