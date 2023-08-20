import axios from "axios";
import { BASE_URL } from "../constants/AppConstant";
const getWallet = async (id) => {
  const res = await axios.get(`${BASE_URL}/wallet/${id}`);
  return res?.data;
};

const initializeWallet = async (data) => {
  const res = await axios.post(`${BASE_URL}/setup`, data);
  return res?.data;
};

export { getWallet, initializeWallet };
