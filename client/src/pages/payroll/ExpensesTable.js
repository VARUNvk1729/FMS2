import React, { useMemo, useState, useEffect } from "react";
import { COLUMNS } from "../payroll/columns";
import { mock } from "../payroll/expensesdata";
//import "../table.css";
import BarChart from "../BarChart";
import { updateFunc } from "../payroll/update";
import { Button, Grid } from "@material-ui/core";
import FormDialog from "./dialog";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTable, useBlockLayout, useSticky } from "react-table";
import { Styles } from "../TableStyles";
import "../select.css";
import "./TableStyles.css";
export const PayrollTable = (props) => {
  const { role } = props;
  var XLSX = require("xlsx");
  console.log(role);
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        let json=[];
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            json = XLSX.utils.sheet_to_json(worksheet);
            console.log(json);
            for(let i=0;i<json.length;i++){
            updateApiCall(json[i]);
          }
        };
        // for(let i=0;i<json.length;i++){
        //   updateApiCall(json[i]);
        // }

        reader.readAsArrayBuffer(e.target.files[0]);
    }
  }
  //call api and fetch dat
  // const [countryobj,setCountry]=useState({country:"IND"});
  const updateApiCall = async (data) => {
    console.log("called apicall");
    //let country=countryobj.country;
    let checkobj=data.payroll;
    const response = await fetch(`http://localhost:8000/payroll/check/${checkobj}`);
    const jsonData = await response.json();
    console.log(jsonData);
    if(jsonData.length===0){
      
      fetch("http://localhost:8000/payroll/addRow/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => console.log("row does not exist in database and successfully added"));
    }
    else{
      let upobj = data;
    console.log(upobj);
    fetch(`http://localhost:8000/payroll/updateRow/${data.payroll}`, {
      method: "PUT",
      body: JSON.stringify(upobj),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => console.log("row already exists in database and successfully updated"));
    }
  };
  const apiCall = async () => {
    console.log("called apicall");
    //let country=countryobj.country;
    const response = await fetch(`http://localhost:8000/payroll/`);
    const jsonData = await response.json();
    console.log("got data from api");
    console.log(jsonData);
    let newob = {
      payroll: "",
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
    newob.payroll = "Total Expenses";
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

  const DeleteBtn = ({
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
        {/* <button type="button" onClick={()=>handleUpdate(index)}>Update</button>
        <button type="button" onClick={()=>handleDelete(index)} >Delete</button> */}
      </div>
    );
  };
  //comment 3
  for (let i = 1; i < 13; i++) {
    COLUMNS[i].Cell = EditableNumberCell;
  }
  if (role === true) {
    if (COLUMNS[COLUMNS.length - 1].Header !== "Actions") {
      COLUMNS.push({
        Header: "Actions",
        accessor: "deleteBtn",
        sticky: "right",
      });
    }
    COLUMNS[COLUMNS.length - 1].Cell = DeleteBtn;
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/payroll/deleteRow/${data[id].payroll}`, {
      method: "DELETE",
    }).then((resp) => apiCall());
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
  let [data, setData] = React.useState(mock);
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "payroll");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "payroll.xlsx");
  };
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
    fetch(`http://localhost:8000/payroll/updateRow/${data[id].payroll}`, {
      method: "PUT",
      body: JSON.stringify(upobj),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => apiCall());
  };

  const tableInstance = useTable(
    {
      columns,
      data: data,
      updateMyData,
      handleDelete,
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
    payroll: "",
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
  });
  const onChange = (e) => {
    const { value, id } = e.target;
    //console.log({...formData,[id]:value})
    if (id === "payroll") {
      setFormData({ ...formData, [id]: value });
    } else {
      setFormData({ ...formData, [id]: parseInt(value) });
    }
  };
  const handleFormData = (data1) => {
    console.log(data1);
    data1.total = [
      data1.jan,
      data1.feb,
      data1.mar,
      data1.apr,
      data1.may,
      data1.jun,
      data1.jul,
      data1.aug,
      data1.sep,
      data1.oct,
      data1.nov,
      data1.dec,
    ].reduce((sum, current) => sum + current, 0);

    let newData = new Array(...data);
    newData.push(data1);
    setData(newData);
    console.log("updating data from the form");
    fetch("http://localhost:8000/payroll/addRow/", {
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
  //    fetch('http://localhost:8000/payroll/deleteRow'+`/${id}`,{method:"DELETE"}).then(resp=>apiCall());

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
        <form>
        <label htmlFor="upload">Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>
      </div>
      {/*<div className="chartcont">
    <BarChart chartData={cd}/>
    </div> */}
    </div>
  );
};

// module.exports={ExpensesTable,country}
