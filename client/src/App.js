import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import { Login } from "./pages/login";
import { Register1 } from "./pages/register1";
import { useSelector } from "react-redux";
import axios from "axios";
import { ExpensesTable } from "./pages/cashflow/ExpensesTable";
import { ExpenseTable1 } from "./pages/revenue/ExpensesTable1";
import { React, useState } from "react";
import { useEffect } from "react";
//import { ContractorExp } from "./pages/contractorexpenses/ContractorExp";
import { OpexExpenses } from "./pages/opex/expensestable";
import { PayrollTable } from "./pages/payroll/ExpensesTable";
import { Dashboardtable } from "./pages/dashboard/expensestable";
import { UserRegister } from "./pages/UserRegister";
import { applyMiddleware } from "redux";
import { CapitalExpense } from "./pages/capital/furniture";
import Software from "./pages/capital/software";
import Hardware from "./pages/capital/hardware";
import { VendorTable } from "./pages/vendor/ContractorExp";

import Index from "./pages/index";
const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

const App = () => {
  // let idd = localStorage.getItem("name");
  // console.log(idd);

  // async function fetchData() {
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/users/${idd}`);
  //     const jsonData = await response.json();
  //     return jsonData;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // async function fetchAndLogRole() {
  //   let data = await fetchData();
  //   let dataArray = data.data;
  //   let arole = dataArray[0].role;
  //   return arole;
  // }

  // const [arole, setARole] = useState("");

  // useEffect(() => {
  //   fetchAndLogRole().then((arole) => {
  //     setARole(arole);
  //   });
  // }, []);

  // var varunrole = arole;
  // console.log("varunn", varunrole);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/vendor"
            element={<VendorTable role={true} />}
          />
          <Route
            path="/dashboard/revenue"
            element={
              <>
                <ExpenseTable1 role={true} />
                <Dashboardtable />
              </>
            }
          />
          {/* <Route
            path="/dashboard/contractorexpenses"
            element={<ContractorExp role={true} />}
          /> */}
          <Route
            path="/dashboard/opex"
            element={<OpexExpenses role={true} />}
          />
          <Route path="/dashboard/furniture" element={<CapitalExpense />} />
          <Route path="/dashboard/software" element={<Software />} />
          <Route path="/dashboard/Hardware" element={<Hardware />} />
          <Route
            path="/dashboard/payroll"
            element={<PayrollTable role={true} />}
          />
          <Route path="/dashboard/createuser" element={<UserRegister />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path="/register" element={<Register1 />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
