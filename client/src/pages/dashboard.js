import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import Layout from "../components/layout";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { FaSuperpowers, FaMoneyBillWave, FaPlusCircle } from "react-icons/fa";
import { name12 } from "./login";
import arole from "../App";
import { Statistics } from "./dashboard/maindashboard";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu, // import the SubMenu component
} from "react-pro-sidebar";

import axios from "axios";
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";

const Dashboard = () => {
  let idd = localStorage.getItem("name");
  console.log(idd);

  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${idd}`);
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchAndLogRole() {
    let data = await fetchData();
    let dataArray = data.data;
    let arole = dataArray[0].role;
    return arole;
  }

  const [arole, setARole] = useState("");

  useEffect(() => {
    fetchAndLogRole().then((arole) => {
      setARole(arole);
    });
  }, []);

  console.log(arole);
  // function fetchData() {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const idd = localStorage.getItem("name");
  //       const response = await fetch(`http://localhost:8000/api/users/${idd}`);
  //       const jsonData = await response.json();
  //       resolve(jsonData);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }

  // fetchData()
  //   .then((jsonData) => {
  //     console.log(jsonData);

  //     // myFunction(jsonData);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);
  const [user, setUser] = useState(null);
  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      setProtectedData(data.info);
      setUser(data.user); // set user object from backend

      setLoading(false);
    } catch (error) {
      logout();
    }
  };
  useEffect(() => {
    protectedInfo();
  }, []);
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <>
      <div id="header">
        <div style={{ display: "flex" }}>
          <div>
            <ProSidebar collapsed={menuCollapse}>
              <SidebarHeader>
                <div className="logotext">
                  <p>{menuCollapse ? "FMS" : "FMS"}</p>
                </div>
                <div className="closemenu" onClick={menuIconClick}>
                  {menuCollapse ? (
                    <FiArrowRightCircle />
                  ) : (
                    <FiArrowLeftCircle />
                  )}
                </div>
              </SidebarHeader>
              <SidebarContent>
                <Menu iconShape="square">
                  <MenuItem active={true} icon={<FiHome />}>
                    <Link to="/">Home</Link>
                  </MenuItem>
                  <div className="varun">
                    {arole == "A" && (
                      <SubMenu title="Analytics" icon={<FaList />}>
                        <MenuItem icon={<FaMoneyBillWave />}>
                          <Link to="/dashboard/vendor">Vendor</Link>
                        </MenuItem>
                        <MenuItem icon={<FaMoneyBillWave />}>
                          <Link to="/dashboard/revenue">Revenue</Link>
                        </MenuItem>
                        <MenuItem icon={<FaMoneyBillWave />}>
                          <Link to="/dashboard/furniture">Capital</Link>
                          {/* <SubMenu>
                            <MenuItem>
                              <Link to="/dashboard/furniture/software">
                                Software
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <Link to="/dashboard/furniture/hardware">
                                Hardware
                              </Link>
                            </MenuItem>
                          </SubMenu> */}
                        </MenuItem>
                        <MenuItem icon={<FaMoneyBillWave />}>
                          <Link to="/dashboard/opex">Opex</Link>
                        </MenuItem>
                        <MenuItem icon={<FaMoneyBillWave />}>
                          <Link to="/dashboard/payroll">Payroll</Link>
                        </MenuItem>
                      </SubMenu>
                    )}

                    {arole == "v" && (
                      <SubMenu title="Analytics" icon={<FaList />}>
                        <MenuItem icon={<FaMoneyBillWave />}>
                          <Link to="/dashboard/vendor">Vendor</Link>
                        </MenuItem>
                      </SubMenu>
                    )}

                    {arole == "r" && (
                      <SubMenu title="Analytics" icon={<FaList />}>
                        <MenuItem icon={<FaMoneyBillWave />}>
                          <Link to="/dashboard/revenue">Revenue</Link>
                        </MenuItem>
                      </SubMenu>
                    )}

                    {arole == "c" && (
                      <SubMenu title="Analytics" icon={<FaList />}>
                        <MenuItem icon={<FaMoneyBillWave />}>
                          <Link to="/dashboard/furniture">Capital</Link>
                        </MenuItem>
                      </SubMenu>
                    )}

                    {arole == "o" && (
                      <SubMenu title="Analytics" icon={<FaList />}>
                        <MenuItem icon={<FaMoneyBillWave />}>
                          <Link to="/dashboard/opex">Opex</Link>
                        </MenuItem>
                      </SubMenu>
                    )}

                    {arole == "p" && (
                      <SubMenu title="Analytics" icon={<FaList />}>
                        <MenuItem icon={<FaMoneyBillWave />}>
                          <Link to="/dashboard/payroll">Payroll</Link>
                        </MenuItem>
                      </SubMenu>
                    )}
                  </div>
                  <MenuItem icon={<FaSuperpowers />}>About US</MenuItem>
                  <MenuItem icon={<FaPlusCircle />}>
                    <Link to="/dashboard/createuser">Add User</Link>
                  </MenuItem>
                </Menu>
              </SidebarContent>
              <SidebarFooter>
                <Menu iconShape="square">
                  <MenuItem icon={<FiLogOut />}>
                    {" "}
                    <Link to="/" onClick={() => logout()}>
                      Logout
                    </Link>
                  </MenuItem>
                </Menu>
              </SidebarFooter>
            </ProSidebar>
          </div>
          <div className="statistics-container">
            <Statistics />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
