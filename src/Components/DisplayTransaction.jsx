import { Link } from "react-router-dom";
import Lodash from "lodash";
import { useEffect } from "react";
const DisplayTransaction = () => {
  //getting value from storage
  const data = [localStorage.getItem("value")];
  //setting running balance
  //for setting running value once
  useEffect(() => {
    localStorage.setItem("balance", 50000);
  }, []);

  // use in case of getting cors error

  //   const data = [
  //     {
  //       date: "10/12/2020",
  //       desc: "time",
  //       credit: "20+",
  //       debit: "20-",
  //       balance: "25000",
  //     },
  //     {
  //       date: "02/11/2020",
  //       desc: "time",
  //       credit: "20+",
  //       debit: "20-",
  //       balance: "25000",
  //     },
  //     {
  //       date: "05/12/2018",
  //       desc: "time",
  //       credit: "20+",
  //       debit: "20-",
  //       balance: "25000",
  //     },
  //     {
  //       date: "04/12/2020",
  //       desc: "time",
  //       debit: "20-",
  //       balance: "25000",
  //     },
  //     {
  //       date: "02/12/2019",
  //       desc: "time",
  //       credit: "20+",
  //       balance: "25000",
  //     },
  //   ];

  //rendering table
  const renderTable = (Data) => {
    if (Data) {
      console.log(Data);
      var parsed = JSON.parse(Data[0]);
      let sorted = Lodash.sortBy(parsed, [
        function (obj) {
          return obj.date;
        },
      ]);

      //use in case of cors error

      // if (Data) {
      //   let sorted = Lodash.sortBy(Data, [
      //     function (obj) {
      //       return obj.date;
      //     },
      //   ]);

      //mapping
      return sorted.map((val, idx) => {
        return (
          <tr key={idx}>
            <td>{val.date}</td>
            <td>{val.desc}</td>
            <td>{val.credit}</td>
            <td>{val.debit}</td>
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
