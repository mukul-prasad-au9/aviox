import { Link } from "react-router-dom";
import Lodash from "lodash";
const DisplayTransaction = () => {
  //getting value from storage
  const data = [localStorage.getItem("value")];

  //rendering table
  const renderTable = (Data) => {
    if (Data) {
      var parsed = JSON.parse(Data[0]);

      let sorted = Lodash.sortBy(parsed, [
        function (obj) {
          return obj.date;
        },
      ]);

      //mapping
      return sorted.map((val, idx) => {
        return (
          <tr key={idx}>
            <td>{val.date}</td>
            <td>{val.description}</td>
            {val.type === "credit" ? <td>{val.amount}</td> : <td></td>}
            {val.type === "debit" ? <td>{val.amount}</td> : <td></td>}
            <td>{val.balance}</td>
          </tr>
        );
      });
    }
  };
  //jsx element
  return (
    <div>
      <table className="table">
        <thead>
          <tr style={{ border: "solid black" }}>
            <th scope="col">Office Transaction</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">
              <Link to="/addtransaction">+Add Transaction</Link>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Credit</th>
            <th scope="col">Debit</th>
            <th scope="col">Running Balance</th>
          </tr>
        </thead>
        <tbody>{renderTable(data)} </tbody>
      </table>
    </div>
  );
};
export default DisplayTransaction;
