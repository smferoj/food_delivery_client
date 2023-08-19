import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://food-delivery-server-i4eeomlkv-smferoj-gmailcom.vercel.app/api/v1",
});

export default axiosInstance;
