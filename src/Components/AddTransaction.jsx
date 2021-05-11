//Add transaction page
import { useState } from "react";
const AddTransaction = (props) => {
  //using  states  for controlled input
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("credit");
  //submit function
  const submitInfo = () => {
    //getting curr date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    let balance = 0;
    var curr = yyyy + "/" + mm + "/" + dd;
    //debit the value from total
    if (type === "debit") {
      balance = localStorage.getItem("balance") - amount;
      localStorage.setItem("balance", balance);
    }
    //credit the value from total
    if (type === "credit") {
      balance = parseInt(localStorage.getItem("balance")) + parseInt(amount);
      localStorage.setItem("balance", balance);
    }
    //setting value in localstorage
    localStorage.setItem("value", [
      localStorage.getItem("value"),
      JSON.stringify({
        date: curr,
        description: desc,
        amount: amount,
        type: type,
        balance: balance,
      }),
    ]);
    //redirecting towards homepage
    props.history.push("/");
  };
  //jsx part
  return (
    <div className="d-flex mt-5 align-items-center">
      <div className="container" style={{ border: "solid black" }}>
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column">
            <h2>New Transaction</h2>
            <div className="d-flex justify-content-around">
              <span>Transaction Type:</span>
              <select
                className="btn btn-light"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
            <div className="d-flex justify-content-around">
              <span>Amount</span>
              <input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                name="amount"
              />
            </div>
            <div className="d-flex justify-content-around">
              <span>Description</span>
              <input
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                className="input-control"
                type="text"
                name="description"
              />
            </div>
            <div className="d-flex justify-content-around">
              <button onClick={submitInfo} className="btn btn-success">
                Submit
              </button>
              <button
                onClick={() => {
                  props.history.push("/");
                }}
                className="btn btn-light"
              >
                xCancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddTransaction;