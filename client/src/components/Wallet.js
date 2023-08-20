import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTransaction } from "../managers/TransactionManager";
import { getWallet, initializeWallet } from "../managers/WalletManager";
import "../styles/Wallet.css";
import { numberPrecision } from "../utils/NumberPrecision";

const Wallet = () => {
  const [state, setState] = useState({ name: "", balance: null });
  const [transaction, setTransaction] = useState({
    amount: null,
    description: "",
    transactionType: "",
  });
  const [wallet, setWallet] = useState(
    JSON.parse(localStorage.getItem("walletData"))
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleTransaction = async () => {
    if (transaction.amount <= 0) {
      alert("Amount can not be negative or zero");
      return;
    }

    if (transaction.description == "") {
      alert("Description field is required");
      return;
    }

    if (transaction.transactionType == "") {
      alert("Transaction Type field is required");
      return;
    }
    setLoading(true);
    const walletId = JSON.parse(localStorage.getItem("walletData"))?._id;
    const result = await addTransaction(walletId, transaction);
    if (result.statusCode === 200) {
      const walletData = await getWallet(walletId);
      if (walletData.statusCode === 200) {
        localStorage.setItem("walletData", JSON.stringify(walletData?.data));
        setWallet(walletData?.data);
      }
      alert("Transaction created successfully");
      setTransaction({ amount: null, description: "", transactionType: "" });
      setLoading(false);
    } else {
      alert("Transaction creation");
    }
  };
  const handleSubmit = async () => {
    if (state.name == "") {
      alert("Name field is required");
      return;
    }
    if (numberPrecision(state.balance) <= 0) {
      alert("Amount can not be negative or zero");
      return;
    }
    setLoading(true);
    const result = await initializeWallet({
      ...state,
      balance: numberPrecision(state.balance),
    });
    if (result.statusCode === 200) {
      localStorage.setItem("walletData", JSON.stringify(result?.data));
      setWallet(result?.data);
      alert("Wallet initiated successfully");
      setLoading(false);
    } else {
      alert("Wallet initiation failed");
    }
  };

  const setWalletData = (e) => {
    let newState = { ...state };
    newState[e.target.name] = e.target.value;
    setState({ ...newState });
  };

  const setTransactionData = (e) => {
    let newTransaction = { ...transaction };
    newTransaction[e.target.name] = e.target.value;
    setTransaction({ ...newTransaction });
  };

  const handleTransactionTypeChange = (e) => {
    setTransaction({ ...transaction, transactionType: e.currentTarget.value });
  };
  useEffect(() => {}, [wallet]);
  if (loading) return <div>loading...</div>;

  return (
    <>
      {JSON.parse(localStorage.getItem("walletData")) ? (
        <div>
          <h5 className="form-step">Wallet Data</h5>
          <div>
            <div className="walletData">
              <label for="name">Name:</label>
              <input
                id="name"
                value={wallet?.name}
                readOnly
                className="readOnly"
              />
            </div>
            <div className="walletData">
              <label for="balance">Balance:</label>
              <input
                id="balance"
                value={numberPrecision(wallet?.balance)}
                readOnly
                className="readOnly"
              />
            </div>
          </div>
          <div>
            <h1>Add New Transaction</h1>
            <input
              placeholder="Amount"
              name="amount"
              type="number"
              min={0}
              value={numberPrecision(transaction?.amount)}
              onChange={setTransactionData}
            />
            <input
              placeholder="Description"
              name="description"
              value={transaction?.description}
              onChange={setTransactionData}
            />
            <div className="">
              <p>Transaction Type:</p>
              <div className="radioButton">
                <input
                  type="radio"
                  id="credit"
                  name="transactionType"
                  value="CREDIT"
                  checked={transaction.transactionType === "CREDIT"}
                  onChange={handleTransactionTypeChange}
                />
                <label for="credit" style={{ marginLeft: "1rem" }}>
                  Credit
                </label>
              </div>
              <br />
              <div className="radioButton">
                <input
                  type="radio"
                  id="debit"
                  name="transactionType"
                  value="DEBIT"
                  checked={transaction.transactionType === "DEBIT"}
                  onChange={handleTransactionTypeChange}
                />
                <label for="debit" style={{ marginLeft: "1rem" }}>
                  Debit
                </label>
              </div>
              <br />
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleTransaction}>
            Add Transaction
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/transactions")}
          >
            See All Transactions
          </button>
        </div>
      ) : (
        <div>
          <h5 className="form-step"> Create a Wallet </h5>
          <div className="field1">
            <input
              placeholder="Name"
              name="name"
              value={state.name}
              onChange={setWalletData}
            />
            <input
              placeholder="Amount"
              name="balance"
              type="number"
              min={0}
              value={numberPrecision(state.balance)}
              onChange={setWalletData}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default Wallet;
