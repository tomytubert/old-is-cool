export const typeOfCar = [
  {
    value: "Coche",
    label: "Coche",
    name: "typeOfCar",
  },
  {
    value: "Furgoneta",
    label: "Furgoneta",
    name: "typeOfCar",
  },
  {
    value: "Camion",
    label: "Camion",
    name: "typeOfCar",
  },
];
export const fuel = [
  {
    value: "Gasolina",
    label: "Gasolina",
    name: "fuel",
  },
  {
    value: "Diesel",
    label: "Diesel",
    name: "fuel",
  },
];
export const fromWhere = [
  {
    value: "Europa",
    label: "Europa",
    name: "fromWhere",
  },
  {
    value: "Asia",
    label: "Asia",
    name: "fromWhere",
  },
  {
    value: "America",
    label: "America",
    name: "fromWhere",
  },
];
export const typeOfTransmision = [
  {
    value: "Manual",
    label: "Manual",
    name: "typeOfTransmision",
  },
  {
    value: "Automatico",
    label: "Automatico",
    name: "typeOfTransmision",
  },
];
export const colors = [
  {
    value: "Rojo",
    label: "Rojo",
    name: "color",
  },
  {
    value: "Azul",
    label: "Azul",
    name: "color",
  },
  {
    value: "Verde",
    label: "Verde",
    name: "color",
  },
  {
    value: "Amarillo",
    label: "Amarillo",
    name: "color",
  },
  {
    value: "Beige",
    label: "Beige",
    name: "color",
  },
  {
    value: "Blanco",
    label: "Blanco",
    name: "color",
  },
  {
    value: "Granate",
    label: "Granate",
    name: "color",
  },
  {
    value: "Gris/Plata",
    label: "Gris/Plata",
    name: "color",
  },
  {
    value: "Marron",
    label: "Marron",
    name: "color",
  },
  {
    value: "Naranja",
    label: "Naranja",
    name: "color",
  },
  {
    value: "Negro",
    label: "Negro",
    name: "color",
  },
  {
    value: "Rosa",
    label: "Rosa",
    name: "color",
  },
  {
    value: "Violeta/Lila",
    label: "Violeta/Lila",
    name: "color",
  },
];

const arr = [
  "Alava",
  "Albacete",
  "Alicante",
  "Almería",
  "Asturias",
  "Avila",
  "Badajoz",
  "Barcelona",
  "Burgos",
  "Cáceres",
  "Cádiz",
  "Cantabria",
  "Castellón",
  "Ciudad Real",
  "Córdoba",
  "La Coruña",
  "Cuenca",
  "Gerona",
  "Granada",
  "Guadalajara",
  "Guipúzcoa",
  "Huelva",
  "Huesca",
  "Islas Baleares",
  "Jaén",
  "León",
  "Lérida",
  "Lugo",
  "Madrid",
  "Málaga",
  "Murcia",
  "Navarra",
  "Orense",
  "Palencia",
  "Las Palmas",
  "Pontevedra",
  "La Rioja",
  "Salamanca",
  "Segovia",
  "Sevilla",
  "Soria",
  "Tarragona",
  "Santa Cruz de Tenerife",
  "Teruel",
  "Toledo",
  "Valencia",
  "Valladolid",
  "Vizcaya",
  "Zamora",
  "Zaragoza",
];

export const getAllAddress = () => {
  const newArr = [];
  arr.forEach((provincia) => {
    newArr.push({
      value: provincia,
      label: provincia,
      name: "address",
    });
  });
  return newArr;
};
