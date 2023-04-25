import React, { useMemo, useState, useEffect } from "react";
import { COLUMNS } from "../opex/columns";
import { mock } from "../opex/expensesdata";
//import '../table.css'
//import BarChart from '../BarChart'
import { updateFunc } from "../opex/update";
import { Button, Grid } from "@material-ui/core";
import FormDialog from "./dialog";
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";
import { Styles } from "../TableStyles";
import "../select.css";
import "./TableStyles.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const OpexExpenses = (props) => {
  const { role } = props;
  var XLSX = require("xlsx");

  console.log(role);
  //call api and fetch dat

  const apiCall = async () => {
    console.log("called apicall");
    const response = await fetch(`http://localhost:8000/opex`);
    const jsonData = await response.json();
    console.log("got data from api");
    console.log(jsonData);
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
      for (let j = 0; j < data.length; j++) {
        s += data[j][month[i]];
      }
      newob[month[i]] = s;
    }
    let newData = new Array(...jsonData);
    newData.push(newob);
    setData(newData);
  };
  useEffect(() => {
    console.log("rendered in useeffect hook");
    apiCall();
  }, []);
  //   console.log(mock)

  const EditableNumberCell = ({
    cell: { value },
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
  }) => {
    const onChange = (e) => {
      updateMyData(index, id, parseInt(e.target.value, 10));
    };

    return <input value={value} onChange={onChange} type="number" />;
  };

  const ActionBtn = ({
    cell: { value },
    row: { index },
    column: { id },
    handleDelete,
    handleUpdate,
  }) => {
    return (
      <div>
        <EditOutlined onClick={() => handleUpdate(index)} />
        <DeleteOutlined
          onClick={() => handleDelete(index)}
          style={{ color: "red", marginLeft: 12 }}
        />
        {/*}   <button type="button" onClick={()=>handleUpdate(index)}>Update</button>
         <button type="button" onClick={()=>handleDelete(index)} >Delete</button>*/}
      </div>
    );
  };
  //comment 3
  for (let i = 1; i < 13; i++) {
    COLUMNS[i].Cell = EditableNumberCell;
  }
  if (role === true) {
    if (COLUMNS[COLUMNS.length - 1].Header !== "Action") {
      COLUMNS.push({
        Header: "Action",
        accessor: "ActionBtn",
        sticky: "right",
      });
    }
    COLUMNS[COLUMNS.length - 1].Cell = ActionBtn;
  }

  const handleAction = (id) => {
    //console.log(data[id].CashFlow);
    fetch(`http://localhost:8000/opex/deleteRow/${data[id].expense}`, {
      method: "ACTION",
    }).then((resp) => apiCall());
    //window.location.reload(false);
  };

  //   COLUMNS[14].Cell=()=>{

  //     return <div>
  //       <Button variant="outlined" color="primary" onClick={handleDelete("1")}>Update</Button>
  //       <Button variant="outlined" color="secondary" onClick={handleDelete("1")} >Delete</Button>
  //       </div>
  // }
  //comment 2

  const columns = useMemo(() => COLUMNS, []);

  // let [newmock,setMock]=React.useState(()=>{
  //   console.log("in newmock's hook")
  //   console.log(mock)
  //   return updateFunc(mock)[0]});
  let [newmock, setMock] = React.useState(mock);
  let [data, setData] = React.useState(newmock);
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Opex");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Opex.xlsx");
  };
  // let a=updateFunc(data)
  // data=a[0];
  // let pi=a[1];
  // let pf=a[2];

  // let colarray=[];
  // let month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  // let colarray2=[];
  // let colarray3=[];
  // for(let k=0;k<12;k++){
  //   colarray2.push(data[pi][month[k]]);
  //   colarray.push(data[pf][month[k]]);
  //   colarray3.push(data[pf+1][month[k]]);
  // }
  // //console.log(colarray);
  // let cd={
  //   labels: month,
  //   datasets: [
  //     {
  //       label: "Total Cash OutFlow",
  //       data: colarray2,
  //       backgroundColor: [
  //         "#2a71d0"
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //     {
  //       label: "Total Expenses",
  //       data: colarray,
  //       backgroundColor: [
  //         "#ecf0f1",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //     {
  //       type:"line",
  //       label: "Total Ending Cash",
  //       data: colarray3,
  //       backgroundColor: [
  //           "rgba(75,192,192,1)",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     }
  //   ],
  // }
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
    //console.log(data[rowIndex]);
    setMock(data);
    //setUserData(cd);
  };
  const handleUpdate = (id) => {
    let upobj = data[id];
    console.log(upobj);
    //console.log(data[id].CashFlow);
    fetch(`http://localhost:8000/opex/updateRow/${data[id].expense}`, {
      method: "PUT",
      body: JSON.stringify(upobj),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => apiCall());
  };

  //   const [userData, setUserData] = useState(()=>{
  //     return cd
  //   });
  //comment 1

  const tableInstance = useTable(
    {
      columns,
      data: data,
      updateMyData,
      handleAction,
      handleUpdate,
    },
    useBlockLayout,
    useSticky
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
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
  });
  const onChange = (e) => {
    const { value, id } = e.target;
    //console.log({...formData,[id]:value})

    if (id === "expense") {
      setFormData({ ...formData, [id]: value });
    } else {
      setFormData({ ...formData, [id]: parseInt(value) });
    }
  };

  const handleFormData = (data1) => {
    console.log(data1);

    let newData = new Array(...data);
    newData.push(data1);
    setData(newData);

    console.log("updating data from the form");
    fetch("http://localhost:8000/opex/addRow/", {
      method: "POST",
      body: JSON.stringify(data1),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => apiCall());
  };

  //   const onSelection=(e)=>{
  //     let val=e.target.value;
  //     //console.log(val);
  //     console.log({...countryobj,country:val})
  //     setCountry({...countryobj,country:val});
  //     console.log("updationg country")
  //     console.log(countryobj.country);
  //     //apiCall();
  //   }

  // const handleDelete=(id)=>{
  //   console.log(id);
  //    fetch('http://localhost:8000/opex/deleteRow'+`/${id}`,{method:"DELETE"}).then(resp=>apiCall());

  // }
  return (
    <div className="page">
      {/* <div>
        <h1 className='head'>CashFlow For {countryobj.country==="IND"?"India":countryobj.country==="AUS"?"Australia":"United States of America"}</h1>
        <img src="https://img.freepik.com/free-vector/abstract-graphic-logo_1043-36.jpg?w=740&t=st=1679981990~exp=1679982590~hmac=0eafc258c552b9e4f03763531ac0c6689846ae65a2d1d8421f1f8f9134c7fe07"/>
      </div>
      <div class="labelclass">
      <label htmlFor="countries">Select the country</label>
          <select name="countries" id="cars" onChange={onSelection}>
            <option value="IND">India</option>
            <option value="AUS">Australia</option>
            <option value="USA">USA</option>
          </select>  
      </div> */}
      <div className="fortable">
        <Styles>
          <div className="scrollable-container">
            <table
              {...getTableProps()}
              className="table sticky"
              style={{ width: 1000, height: 500 }}
            >
              <thead className="header">
                {headerGroups.map((each) => (
                  <tr {...each.getHeaderGroupProps()} className="tr">
                    {each.headers.map((column) => (
                      <th {...column.getHeaderProps()} className="th">
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="body">
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="tr">
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} className="td">
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Styles>
      </div>
      {/* <div>
      <button type="button" onClick={()=>
      setData(()=>updateFunc(data)[0])}>Save</button>
    </div> */}
      <div style={{ display: "flex" }}>
        <div className="addbtn">
          <Grid align="right">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Add Expense
            </Button>
          </Grid>
          <FormDialog
            open={open}
            handleClose={handleClose}
            data={formData}
            onChange={onChange}
            handleFormData={handleFormData}
          />
        </div>
        <div className="addbtn" style={{ padding: " 0px 0px 0px 20px" }}>
          <Grid align="right">
            <Button variant="contained" color="info" onClick={downloadExcel}>
              Print
            </Button>
          </Grid>
        </div>
      </div>
      {/*<div className="chartcont">
    <BarChart chartData={cd}/>
    </div> */}
    </div>
  );
};

// module.exports={ExpensesTable,country}
