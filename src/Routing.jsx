import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AddTransaction from "./Components/AddTransaction";
import DisplayTransaction from "./Components/DisplayTransaction";
const Routing = () => {
  return (
    <BrowserRouter>
      <Route path="/addtransaction" component={AddTransaction} />
      <Route exact path="/" component={DisplayTransaction} />
    </BrowserRouter>
  );
};
export default Routing;
