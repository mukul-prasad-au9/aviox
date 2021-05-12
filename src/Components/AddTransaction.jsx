//Add transaction page
import { useState } from "react";
const AddTransaction = (props) => {
  //using  states  for controlled input
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("credit");
  const [msg, setMsg] = useState("");
  //submit function
  const submitInfo = () => {
    if (type === "debit") {
      if (amount > localStorage.getItem("running")) {
        setMsg(
          `cannot debit more than current balance ${localStorage.getItem(
            "running"
          )}`
        );
        return;
      }
      if (parseInt(localStorage.getItem("running")) === 0) {
        setMsg("cannot debit from 0 running balance");
        return;
      }
    }
    //getting curr date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    let balance = 0;
    var curr = yyyy + "/" + mm + "/" + dd;
    //debit the value from total
    if (type === "debit") {
      balance = parseInt(localStorage.getItem("running")) - parseInt(amount);
    }
    //credit the value from total
    if (type === "credit") {
      balance = parseInt(localStorage.getItem("running")) + parseInt(amount);
    }
    let previous = localStorage.getItem("value");
    //setting value in localstorage
    if (previous == null) {
      localStorage.setItem("running", 0);
      balance = parseInt(localStorage.getItem("running")) + parseInt(amount);
      localStorage.setItem(
        "value",
        JSON.stringify([
          {
            date: curr,
            description: desc,
            amount: amount,
            type: type,
            balance: balance,
          },
        ])
      );
      localStorage.setItem("running", balance);
    } else {
      var PrevV = JSON.parse(localStorage.getItem("value"));
      var newV = [
        {
          date: curr,
          description: desc,
          amount: amount,
          type: type,
          balance: balance,
        },
      ];
      //concating two arrays
      var Combined = PrevV.concat(newV);
      localStorage.setItem("value", JSON.stringify(Combined));
      localStorage.setItem("running", balance);
    }
    //redirecting towards homepage
    props.history.push("/");
  };
  //jsx part
  return (
    <div className="container mt-5" style={{ border: "solid black" }}>
      <h2>New Transaction</h2>
      <p>{msg}</p>
      <div className="d-flex flex-column container p-5">
        <div className="d-flex">
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
        <div className="d-flex">
          <span>Amount</span>
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="form-control"
            type="number"
            name="amount"
          />
        </div>
        <div className="d-flex">
          <span>Description</span>
          <input
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            className="form-control"
            type="text"
            name="description"
          />
        </div>
        <div className="d-flex justify-content-center">
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
  );
};
export default AddTransaction;
