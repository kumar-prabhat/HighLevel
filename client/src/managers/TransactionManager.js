import axios from "axios";
import { BASE_URL } from "../constants/AppConstant";

const getTransactionsByWalletId = async (id, filter) => {
  const res = await axios.get(
    `${BASE_URL}/transactions/${id}?filter=${JSON.stringify(filter)}`
  );
  return res?.data;
};

const addTransaction = async (id, data) => {
  const res = await axios.post(`${BASE_URL}/transact/${id}`, data);
  return res?.data;
};

export { getTransactionsByWalletId, addTransaction };
