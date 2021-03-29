import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types"
import qs from "qs";
import {fromWhere} from "../SellCar/data";
import Select from "react-select";
import YearPicker from "react-year-picker";
import { getAdverts, findAdverts } from "../../service/advert.service";
import { getBrands } from "../../service/brand.service";
import Loading from "../../components/Loading/Loading";
import {
  Holster,
  CarouselHomePage,
  AdvertWrapPhoto,
  AdvertPhotoHomePage,
} from "../AdvertDetail/styles";
import { FindBtn, Btn } from "./style";





const HomePage = ({handleRenderNavYes,setAdvertsQuery}) => {
  const initialState = {
    brand: "",
    year: "",
    price: 0,
    fromWhere: "",
  };

  const yearPickerRef = React.useRef();
  const [images, setImages] = useState([]);
  const [howMany, setHowMany] = useState(0);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(initialState);
  const history = useHistory();

  const getAllAdverts = async () => {
    const { data } = await getAdverts();
    setHowMany(data.length);
    setImages(data);
  };
  const getAllBrands = async () => {
    try {
      const { data } = await getBrands();
      const newArr = [];
      data.forEach((brand) => {
        newArr.push({
          value: brand.name,
          label: brand.name,
          name: "brand",
        });
        setBrands(newArr);
        setLoading(true);
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (e) => {
    if (e.value) {
      setFilter({ ...filter, [e.name]: e.value });
    }
    if (e.target) {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    }
    if (typeof e === "number") {
      setFilter({ ...filter, year: e });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = qs.stringify(filter);
    const {data} = await findAdverts(query);
    setAdvertsQuery(data)
    history.push(`/coches-clasicos/${query}`)
  };

  useEffect(() => {
    handleRenderNavYes()
    getAllAdverts();
    getAllBrands();
  }, []);

  return (
    <>
      {loading ? (
        <main>
          <section
            className="homeBackground flexColumn"
            style={{ alignContent: "center" }}
          >
            <h1 style={{ marginTop: "10px" }}>
              Encuentra tu coche clasico con el que sueñas
            </h1>
            <div
              className="flexColumn"
              style={{
                alignItems: "center",
                justifyContent: " space-evenly",
                height: "200px",
              }}
            >
              <Link to="coches-clasicos">
                <Btn>Encuentra Tu Coche</Btn>
              </Link>
              <Link to="vender-mi-coche-clasico">
                <Btn>Vende</Btn>
              </Link>
            </div>
          </section>
          <section className="boxShadorHomePage margin10 maxWidth900">
            <form onSubmit={handleSubmit} className="flexColumn maxWidth900">
              <label
                htmlFor="de donde viene"
                className="margin10 textAlignLeft"
              >
                ¿De donde es?
              </label>
              <Select
                placeholder={fromWhere[0].value}
                defaultValue={""}
                options={fromWhere}
                onChange={handleChange}
                className="margin10 width70vw maxWidth900"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary75: "#54CC51",
                    primary: "#08a045",
                    primary50: "#BEF0BE",
                    primary25: "#D5F0DB",
                  },
                })}
              />
              <label htmlFor="year" className="margin10 textAlignLeft">
                Año
              </label>
              <YearPicker
              ref={yearPickerRef}
                name="year"
                onChange={handleChange}
                className="margin10"
                placeholder="Selecciona el año"
              />
              <label htmlFor="brand-car" className="margin10 textAlignLeft">
                ¿Qué marca de coche es?
              </label>
              <Select
                placeholder={brands[0].value}
                defaultValue={""}
                options={brands}
                onChange={handleChange}
                className="margin10 width70vw maxWidth900"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary75: "#54CC51",
                    primary: "#08a045",
                    primary50: "#BEF0BE",
                    primary25: "#D5F0DB",
                  },
                })}
              />
              <div className="flexColumn" style={{ alignItems: "end" }}>
                <label htmlFor="Precio" className="margin10 textAlignLeft">
                  Precio
                </label>
                <input
                  placeholder="30000*"
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={filter.price}
                  className="margin10 width70vw maxWidth900 leftMargin18"
                />
              </div>
              <div style={{display:"flex",justifyContent:"center"}}>
                <FindBtn type="submit"> encuentra tu coche</FindBtn>
              </div>
            </form>
          </section>
          <section
            style={{
              position: " relative",
              top: "-130px",
            }}
          >
            <h2 className="textAlignCenter lineBottom">
              Los coches clasicos americanos más buscados
            </h2>
            <AdvertWrapPhoto>
              <Holster>
                <CarouselHomePage>
                  <div style={{ display: "flex" }}>
                    {images.map(
                      (item, idx) =>
                        item.fromWhere === "America" && (
                          <Link
                            to={`/coches-clasicos/${item.brand}-${item.model}-${item.year}/${item._id}`}
                          >
                            <div key={item.image[0]}>
                              <AdvertPhotoHomePage alt="" src={item.image[0]} />
                            </div>
                          </Link>
                        )
                    )}
                  </div>
                </CarouselHomePage>
              </Holster>
            </AdvertWrapPhoto>
            <h2 className="textAlignCenter lineBottom">
              Los coches clasicos europeos más buscados
            </h2>
            <AdvertWrapPhoto>
              <Holster>
                <CarouselHomePage>
                  <div style={{ display: "flex" }}>
                    {images.map(
                      (item, idx) =>
                        item.fromWhere === "Europa" && (
                          <Link
                            to={`/coches-clasicos/${item.brand}-${item.model}-${item.year}/${item._id}`}
                          >
                            <div key={item.image[0]}>
                              <AdvertPhotoHomePage alt="" src={item.image[0]} />
                            </div>
                          </Link>
                        )
                    )}
                  </div>
                </CarouselHomePage>
              </Holster>
            </AdvertWrapPhoto>
            <h2 className="textAlignCenter lineBottom">
              Los coches clasicos japoneses más buscados
            </h2>
            <AdvertWrapPhoto>
              <Holster>
                <CarouselHomePage>
                  <div style={{ display: "flex" }}>
                    {images.map(
                      (item, idx) =>
                        item.fromWhere === "Asia" && (
                          <Link
                            to={`/coches-clasicos/${item.brand}-${item.model}-${item.year}/${item._id}`}
                          >
                            <div key={item.image[0]}>
                              <AdvertPhotoHomePage alt="" src={item.image[0]} />
                            </div>
                          </Link>
                        )
                    )}
                  </div>
                </CarouselHomePage>
              </Holster>
            </AdvertWrapPhoto>
          </section>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
};

HomePage.defaultProps = {
  handleRenderNavYes: () => {
    return true
  }
}

HomePage.propTypes = {
  handleRenderNavYes: PropTypes.func,
}


export default HomePage;
