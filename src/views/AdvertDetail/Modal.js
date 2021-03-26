import React from "react";
import { Holster, Carousel, AdvertWrapPhotoModal, ModalWrapper,AdvertPhotoModal,CloseIcon } from "./styles";
const Modal = ({ img, openModal }) => {
  return (
    <>
      <ModalWrapper onClick={openModal}>
        <CloseIcon size={40}/>
        <AdvertWrapPhotoModal>
          <Holster>
            <Carousel>
              <div style={{ display: "flex" }}>
                {img.map((item, idx) => (
                  <div key={item}>
                    <AdvertPhotoModal alt="" src={item} />
                  </div>
                ))}
              </div>
            </Carousel>
          </Holster>
        </AdvertWrapPhotoModal>
      </ModalWrapper>
    </>
  );
};

export default Modal;
