import React, { useMemo, useState, useEffect } from "react";
import { useTable, useBlockLayout } from "react-table";
import { useSticky } from "react-table-sticky";
import { Styles } from "../TableStyles";
import { COLUMNS } from "../vendor/columns";
import { mock } from "../vendor/expensesdata";
import "../select.css";
import { Button, Grid } from "@material-ui/core";
import FormDialog from "./dialog";
import "./TableStyles.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
 
export const VendorTable = (props) => {
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
  //...

  //call api and fetch dat
  // const [countryobj,setCountry]=useState({country:"IND"});
  const updateApiCall = async (data) => {
    console.log("called apicall");
    //let country=countryobj.country;
    let checkobj=data.vendors;
    const response = await fetch(`http://localhost:8000/vendor/check/${checkobj}`);
    const jsonData = await response.json();
    console.log(jsonData);
    if(jsonData.length===0){
      
      fetch("http://localhost:8000/vendor/addRow/", {
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
    fetch(`http://localhost:8000/vendor/updateRow/${data.vendors}`, {
      method: "PUT",
      body: JSON.stringify(upobj),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => console.log("row already exists in database and successfully updated"));
    }
  };
  const [mock1, setTodos] = useState(mock);
  const apiCall = async () => {
    console.log("called apicall");
    const response = await fetch(`http://localhost:8000/vendor`);
    const jsonData = await response.json();
    console.log("got data from api");
    console.log(jsonData);
    let newob = {
      vendors: "",
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
    newob.vendors = "Total Expenses";
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
  //   //console.log(mock)
 
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
      </div>
    );
  };
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
 
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/vendor/deleteRow/${data[id].vendors}`, {
      method: "DELETE",
    }).then((resp) => apiCall());
  };
 
  const columns = useMemo(() => COLUMNS, []);
  let [newmock, setMock] = React.useState(mock);
  let [data, setData] = React.useState(newmock);
  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "vendor");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Vendor.xlsx");
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
    fetch(`http://localhost:8000/vendor/updateRow/${data[id].vendors}`, {
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
    vendors: "",
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
    if (id === "vendors") {
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
    fetch("http://localhost:8000/vendor/addRow/", {
      method: "POST",
      body: JSON.stringify(data1),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => apiCall());
    handleClose();
  };
  return (
    <div className="page">
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
       <div style={{display: "flex", flexDirection: "column"}}>
      <div style={{ display: "flex" ,marginBottom:'20px'}}>
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
              Export to Excel
            </Button>
          </Grid>
        </div></div>
        {/* <form style={{textAlign:'right'}}>
        <label htmlFor="upload" >Upload File</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />

      </form> */}
      <label htmlFor="images" className="drop-container">
  <span className="drop-title">Drop files here</span>
  or
  <input type="file"  name="upload"
          id="upload"
          onChange={readUploadFile} required/>
</label>
      </div>
      </div>
  );
};