import axios from "axios";
export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchingPlaces = async (link) => {
  const { data } = await axios.get(link, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "b5d631fcd9msh2b189873864848bp1abb81jsnfbb82d46130f",
    },
  });
  return data;
};
