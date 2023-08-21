import { useEffect, useState } from "react";
import {
  getTransactionsByWalletId,
  downloadTransactions,
} from "../managers/TransactionManager";
import "../styles/Transaction.css";
import Pagination from "./common/Pagination";
import { downloadHandler } from "../utils/FileUtils";
import { numberPrecision } from "../utils/NumberPrecision";
import { toast } from "react-toastify";
const Transaction = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [downloadDisabled, setDownloadDisabled] = useState(false);
  const [filter, setFilter] = useState({
    sort: null,
    limit: 5,
    skip: 0,
  });
  const fetchTransactionData = async () => {
    try {
      const walletId = JSON.parse(localStorage.getItem("walletData"))?._id;
      const result = await getTransactionsByWalletId(walletId, filter);
      if (result.statusCode === 200) {
        setTransactionData(result?.data?.transactions);
        setCount(result?.data?.transactionsCount);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const download = async () => {
    try {
      setDownloadDisabled(true);
      const walletId = JSON.parse(localStorage.getItem("walletData"))?._id;
      const result = await downloadTransactions(walletId);
      if (result.statusCode === 200) {
        downloadHandler(result?.data?.attachment, result?.data?.name);
      }
    } catch (error) {
      toast.error("Something went wront! Download failed!");
    } finally {
      setDownloadDisabled(false);
    }
  };

  const handleSort = async (e) => {
    setFilter({ ...filter, sort: e.target.value });
    await fetchTransactionData();
  };

  useEffect(() => {
    fetchTransactionData();
  }, [filter]);
  return (
    <div>
      <h5 className="form-step"> Transactions Data </h5>
      {transactionData?.length ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <label for="sort">Sort by: </label>
              <select
                name="sort"
                id="sort"
                onChange={handleSort}
                value={filter?.sort}
              >
                <option
                  value="createdAt"
                  selected={filter?.sort === "createdAt"}
                >
                  Date
                </option>
                <option value="amount" selected={filter?.sort === "amount"}>
                  Amount
                </option>
              </select>
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={download}
                disabled={downloadDisabled}
              >
                Download Transactions
              </button>
            </div>
          </div>
          {loading ? (
            <div className="loader">Loading...</div>
          ) : (
            <>
              <table style={{ marginTop: "16px" }} id="transactions">
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
                      <td>{numberPrecision(item.amount)}</td>
                      <td>{numberPrecision(item.balance)}</td>
                      <td>
                        {item.transactionTyp &&
                        item.transactionType === "CREDIT"
                          ? "Credit"
                          : "Debit"}
                      </td>
                      <td>
                        {new Date(item.createdAt).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))}
              </table>
              {count > 5 && (
                <Pagination
                  handleChange={(skip, limit) => {
                    setFilter({ ...filter, limit, skip });
                  }}
                  total={count}
                  limit={5}
                />
              )}
            </>
          )}
        </>
      ) : (
        <div className="loader">No data found</div>
      )}
    </div>
  );
};

export default Transaction;
