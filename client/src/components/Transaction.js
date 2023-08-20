import { useEffect, useState } from "react";
import { getTransactionsByWalletId } from "../managers/TransactionManager";
import "../styles/Transaction.css";
import Pagination from "./Pagination";
const Transaction = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [count, setCount] = useState(0);
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    sort: null,
    limit: 5,
    skip: 0,
  });
  const fetchTransactionData = async () => {
    setLoading(true);
    setReset(false);
    const walletId = JSON.parse(localStorage.getItem("walletData"))?._id;
    const result = await getTransactionsByWalletId(walletId, filter);
    if (result.status == "200") {
      setTransactionData(result?.result?.transactions);
      setCount(result?.result?.transactionsCount);
    }
    setLoading(false);
  };

  const handleSort = async (e) => {
    setFilter({ ...filter, sort: e.target.value });
    await fetchTransactionData();
  };

  useEffect(() => {
    fetchTransactionData();
  }, [filter]);
  if (loading) return <div>loading...</div>;
  return (
    <div>
      <h5 className="form-step"> Transactions Data </h5>
      <label for="sort">Sort the transactions: </label>
      <select name="sort" id="sort" onChange={handleSort} value={filter?.sort}>
        <option value="createdAt" selected={filter?.sort === "createdAt"}>
          Date
        </option>
        <option value="amount" selected={filter?.sort === "amount"}>
          Amount
        </option>
      </select>
      <table id="transactions">
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Balance</th>
          <th>Transaction Type</th>
          <th>Date</th>
        </tr>
        {transactionData?.length &&
          transactionData?.map((item, i) => (
            <tr key={i}>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>{item.balance}</td>
              <td>{item.transactionType}</td>
              <td>{new Date(item.createdAt).toLocaleDateString("en-GB")}</td>
            </tr>
          ))}
      </table>
      <Pagination
        handleChange={(skip, limit) => {
          setFilter({ ...filter, limit, skip });
        }}
        reset={reset}
        total={count}
        limit={5}
      />
    </div>
  );
};

export default Transaction;
