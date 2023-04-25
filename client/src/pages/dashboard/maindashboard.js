import React, { useState, useEffect } from "react";
import "./chart.css";
import BarChart from "../BarChart";
import { Profit } from "./profitloss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimeline,faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import{
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
}
from 'chart.js'
import { Doughnut } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
)

export const Statistics = () => {
  //call api and fetch dat
  const[dd,setdd]=React.useState([]);
  const [graphdata, setGD] = React.useState([]);
  const [labelsdata, setLD] = React.useState([]);
  const [graphdata1, setGD1] = React.useState([]);

  let ec=0;
  let vc=0;
  let pc=0;
  const apiCall = async () => {
    console.log("called apicall");
    //let country=countryobj.country;
    let finalData = [];
    let Gd = [];
    let Gd1 = [];
    let LD = [];
    const response = await fetch(`http://localhost:8000/getStatistics/payroll`);
    const jsonData = await response.json();
    //console.log("got data from api");
    jsonData[0].expense = "Payroll";
    finalData.push(jsonData[0]);
    LD.push("Payroll");
    Gd1.push(jsonData[0].total);
    const response1 = await fetch(`http://localhost:8000/getStatistics/opex/`);
    const jsonData1 = await response1.json();
    //console.log("got data from api");
    jsonData1[0].expense = "Opex";
    finalData.push(jsonData1[0]);
    LD.push("Opex");
    Gd1.push(jsonData1[0].total);
    const response2 = await fetch(`http://localhost:8000/getStatistics/vendor`);
    const jsonData2 = await response2.json();
    //console.log("got data from api");
    jsonData2[0].expense = "Vendors";
    finalData.push(jsonData2[0]);
    LD.push("Vendors");
    Gd1.push(jsonData2[0].total);
    const response3 = await fetch(`http://localhost:8000/dashboard/`);
    const jsonData3 = await response3.json();
    const response4 = await fetch(`http://localhost:8000/getEmployees/`);
    const jsonData4 = await response4.json();
    ec=jsonData4[0].count;
    const response5 = await fetch(`http://localhost:8000/getProjects/`);
    const jsonData5 = await response5.json();
    pc=jsonData5[0].count;
    const response7 = await fetch(`http://localhost:8000/getVendors/`);
    const jsonData7= await response7.json();
    vc=jsonData7[0].count;
    let p=[];
    p.push(ec);
    p.push(pc);
    p.push(vc);
    
    // console.log("got data from api");
    // console.log(jsonData3);
    let interest = {
      expense: "Interest Expense",
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      total: 0,
    };
    let incometax = {
      expense: "Income Taxes",
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      total: 0,
    };
    if (jsonData3.length !== 0) {
      for (let i = 0; i < jsonData3.length; i++) {
        if (jsonData3[i].expense === "Interest Expense") {
          interest = jsonData3[i];
          // console.log(interest);
        }
        if (jsonData3[i].expense === "Income Taxes") {
          incometax = jsonData3[i];
          // console.log("incometax");
          // console.log(incometax);
        }
        if(jsonData3[i].total!=0){
        LD.push(jsonData3[i].expense);
        Gd1.push(jsonData3[i].total);
        }
        finalData.push(jsonData3[i]);
      }
    }
    //console.log(finalData);
    let newob = {
      expense: "",
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      total: 0,
    };
    newob.expense = "Total Expenses";
    let month = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
      "total",
    ];
    for (let i = 0; i < month.length; i++) {
      let s = 0;
      for (let j = 0; j < finalData.length; j++) {
        finalData[j][month[i]] = parseInt(finalData[j][month[i]]);
        s += finalData[j][month[i]];
      }
      newob[month[i]] = s;
    }
    let newData1 = new Array(...finalData);
    newData1.push(newob);

    const response6 = await fetch(`http://localhost:8000/revenue/`);
    const jsonData6 = await response6.json();
    // console.log("got data from api");
    // console.log(jsonData);
    let newob2 = {
      projectname: "",
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      total: 0,
    };
    newob2.projectname = "Total Expenses";
    for (let i = 0; i < month.length; i++) {
      let s = 0;
      for (let j = 0; j < jsonData6.length - 1; j++) {
        s += jsonData6[j][month[i]];
      }
      newob2[month[i]] = s;
    }
    let newData = new Array(...jsonData6);
    newData.splice(newData.length - 1, 0, newob2);
    // newData = newData.splice(newData.length - 1, 0, newob);
    //newData.push(newob);
    let newob1 = {
      projectname: "",
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      total: 0,
    };
    newob1.projectname = "GrossProfit";
    // console.log(jsonData);
    for (let i = 0; i < month.length; i++) {
      newob1[month[i]] +=
        newData[newData.length - 2][month[i]] -
        newData[newData.length - 1][month[i]];
      // newob1[month[i]] = s;
    }
    let newob3 = {
      expense: "",
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      total: 0,
    };
    newData.push(newob1);

    newob3.expense = "earningbeforeit";
    for (let i = 0; i < month.length; i++) {
      newob3[month[i]] +=
        newData[newData.length - 1][month[i]] -
        newData1[newData1.length - 1][month[i]];
      // newob1[month[i]] = s;
    }
    newData1.push(newob3);
    let newob4 = {
      expense: "",
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      total: 0,
    };
    newob4.expense = "Earnings Before Taxes";
    for (let i = 0; i < month.length; i++) {
      newob4[month[i]] +=
        newData1[newData1.length - 1][month[i]] - interest[month[i]];
      // newob1[month[i]] = s;
    }
    newData1.push(newob4);
    let newob5 = {
      expense: "",
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      total: 0,
    };
    newob5.expense = "Net Earnings";
    for (let i = 0; i < month.length; i++) {
      newob5[month[i]] +=
        newData1[newData1.length - 1][month[i]] - incometax[month[i]];
      Gd.push(newob5[month[i]]);
      // newob1[month[i]] = s;
    }
    newData1.push(newob5);
    setdd(p);
    setGD(Gd);
    setGD1(Gd1);
    setLD(LD);
  };
  useEffect(() => {
    console.log("rendered in useeffect hook");
    apiCall();
  }, []);

  let month = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
    "total",
  ];
  let month3 = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Total",
  ];

  console.log(graphdata);
  //console.log(mock)
  let cd = {
    labels: month3,
    datasets: [
      {
        label: "Net Earnings",
        data: graphdata,
        backgroundColor: ["#2a71d0"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  let cd1 = {
    labels: labelsdata,
    datasets: [
      {
        label: "Total Expense",
        data: graphdata1,
        backgroundColor: ["#2a71d0",'green','red','midnightblue','blue','yellow','orange','pink'],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };
  const opitons={

  }
  const [userData, setUserData] = useState(() => {
    return cd;
  });
  const [userData1, setUserData1] = useState(() => {
    return cd1;
  });
  //comment 1
  return (
    // <div className="MC">
    //   <div className="row1">
    //   <div className="profitloss box">
    //     <Profit value={graphdata[graphdata.length - 1]} style={{margin:'30px'}}/>
    //   </div><br/><br/>
      

    //   <div className="box" style={{marginLeft:'50px'}}>
    //     <h3 style={{marginRight:'30px',textAlign:'left'}}>
    //       Total Employees
    //     </h3><hr/>
    //     <p style={{textAlign:'center'}}>
    //       {dd[0]}
    //       </p>
    //   </div><br/><br/>

    //   <div className="box" style={{marginLeft:'50px'}}>
    //     <h3 style={{marginRight:'30px',textAlign:'left'}}>
    //       Total Projects
    //     </h3><hr/>
    //     <p style={{textAlign:'center'}}>
    //       {dd[1]}
    //       </p>
    //   </div><br/><br/>
     
    //   <div className="box" style={{marginLeft:'50px'}}>
    //     <h3 style={{marginRight:'30px',textAlign:'left'}}>
    //       Total Vendors
    //     </h3><hr/>
    //     <p style={{textAlign:'center'}}>
    //       {dd[2]}
    //       </p>
    //   </div><br/><br/>
    //   </div>

    //     <div className="row">
         
    //   <div class="doughnut" style={{marginLeft:'50px'}}>
    //   <h3 style={{textAlign:'left'}}>Expenses Monthly Forecast</h3><hr/>
    //   <div className="chartcont">
    //     <BarChart chartData={cd} />
    //   </div>
    //   </div>
    //   <br/><br/>

    //   <div class="doughnut" style={{marginLeft:'50px'}}>
    //  <h3 style={{textAlign:'left'}}>Types of Expenses</h3><hr/>
    //   <div className="chartcont">
    //     <Doughnut style={{marginLeft:'100px'}}
    //     data={cd1}
    //     >
    //     </Doughnut>
    //   </div>
    // </div>

    // </div> 
    // </div>
    <div>
    <div className="MC">
      <div className="statistics">
        <div className="statisticsi" style={{marginLeft:'49px'}}>
      <div className="profitloss" style={{width:'245px', height:'180px'}}>
        <Profit value={graphdata[graphdata.length - 1]} />
      </div>
      <div className="box" style={{marginLeft:'30px'}}>
         <h3 style={{marginRight:'30px',textAlign:'left',paddingTop:'15px',paddingLeft:'10px'}}>
           Total Employees <FontAwesomeIcon icon={faPeopleGroup} bounce style={{color: "#0fe7eb",}} />
         </h3><hr/>
         <p style={{textAlign:'center', fontSize:'25px'}}>
           {dd[0]}
           </p>
       </div><br/><br/>

       <div className="box" style={{marginLeft:'30px'}}>
         <h3 style={{marginRight:'65px',textAlign:'left',paddingTop:'15px',paddingLeft:'10px'}}>
           Total Projects <FontAwesomeIcon icon={faTimeline} bounce />
         </h3><hr/>
         <p style={{textAlign:'center', fontSize:'25px'}}>
           {dd[1]}
           </p>
       </div><br/><br/>
     
       <div className="box" style={{marginLeft:'30px',marginRight:'150px'}}>
         <h3 style={{marginRight:'65px',textAlign:'left',paddingTop:'15px',paddingLeft:'10px'}}>
           Total Vendors <FontAwesomeIcon icon={faPeopleGroup} bounce style={{color: "#e30d0d",}} />
         </h3><hr/>
         <p style={{textAlign:'center', fontSize:'25px'}}>
           {dd[2]}
           </p>
       </div><br/><br/><br/><br/>
      </div>
      <div className="graphscontainer" style={{marginTop:'5px'}}>
      <div class="doughnut" style={{marginLeft:'50px', marginRight:'50px'}}>
       <h3 style={{textAlign:'left'}}>Expenses Monthly Forecast</h3><hr/>
       <div className="chartcont">
         <BarChart chartData={cd} />
       </div>
       </div><div className="doughnut">
      <h3>Types of Expenses</h3><hr/>
      <div className="chartcont1">
        <Doughnut
        data={cd1}
        >
        </Doughnut>
      </div>
      </div> 
      </div>
      </div>
    </div>
    </div>
  );
};
