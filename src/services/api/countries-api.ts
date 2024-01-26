import axios from "axios";

const api = axios.create({
  baseURL: "https://countriesnow.space/api/v0.1/countries",
});

const getCountries = async () => {
  const response = await api.get("/positions");
  return response.data;
};

const getStates = async (country: string) => {
  const response = await api.get(`/states/q?country=${country}`);
  return response.data;
};

const getCities = async (country: string, state: string) => {
  const response = await api.get(
    `/state/cities/q?country=${country}&state=${state}`,
  );
  return response.data;
};

export { getCities, getCountries, getStates };
