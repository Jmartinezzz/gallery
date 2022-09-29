import axios from "axios";

const token = "563492ad6f917000010000010fa07b6c79424b7b901100ed980fe490";
const BASE_URL = "https://api.pexels.com/v1/search?query=";

export const getImages = async (searchTerm = "Dragon") =>
  await axios.get(`${BASE_URL}${searchTerm}`, {
    headers: { Authorization: token },
  });
