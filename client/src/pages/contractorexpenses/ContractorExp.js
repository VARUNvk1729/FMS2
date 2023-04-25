import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import { mock } from "./expensesdata";
import BarChart from "../BarChart";
import { Button, Grid } from "@material-ui/core";
import FormDialog from "./dialog";

export const ContractorExp = (props) => {
  const { role } = props;

  console.log(role);
  //call api and fetch dat
  const [countryobj, setCountry] = useState({ country: "IND" });

  const [mock1, setTodos] = useState(mock);
  const apiCall = async () => {
    console.log("called apicall");

    let country = countryobj.country;
    const response = await fetch(`http://localhost:8000/contractor/${country}`);
    const jsonData = await response.json();
    console.log("got data from api");
    console.log(jsonData);

    setTodos(jsonData);
    setData(jsonData);
  };
  useEffect(() => {
    console.log("rendered in useeffect hook");
    apiCall();
  }, [countryobj]);
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

  const DeleteBtn = ({
    cell: { value },
    row: { index },
    column: { id },
    handleDelete,
    handleUpdate,
  }) => {
    return (
      <div>
        <button type="button" onClick={() => handleUpdate(index)}>
          Update
        </button>
        <button type="button" onClick={() => handleDelete(index)}>
          Delete
        </button>
      </div>
    );
  };
  //comment 3
  for (let i = 5; i < 22; i++) {
    COLUMNS[i].Cell = EditableNumberCell;
  }
  if (role === true) {
    if (COLUMNS[COLUMNS.length - 1].Header !== "Delete") {
      COLUMNS.push({
        Header: "Delete",
        accessor: "deleteBtn",
      });
    }
    COLUMNS[COLUMNS.length - 1].Cell = DeleteBtn;
  }

  const handleDelete = (id) => {
    let c = { country1: countryobj.country };
    //console.log(data[id].CashFlow);
    fetch(
      `http://localhost:8000/contractor/deleteRow/${countryobj.country}/${data[id].contractorname}`,
      { method: "DELETE" }
    ).then((resp) => apiCall());
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
    upobj.country1 = countryobj.country;
    //console.log(data[id].CashFlow);
    fetch(
      `http://localhost:8000/contractor/updateRow/${data[id].contractorname}`,
      {
        method: "PUT",
        body: JSON.stringify(upobj),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((resp) => apiCall());
  };

  //   const [userData, setUserData] = useState(()=>{
  //     return cd
  //   });
  //comment 1

  const tableInstance = useTable({
    columns,
    data: data,
    updateMyData,
    handleDelete,
    handleUpdate,
  });

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
    contractorname: "",
    country: "",
    Dept: "",
    job_title: "",
    contract_type: "",
    rate: "",
  });
  const onChange = (e) => {
    const { value, id } = e.target;
    //console.log({...formData,[id]:value})
    if (
      id === "contractorname" ||
      id === "country" ||
      id === "dept" ||
      id === "job_title" ||
      id === "contract_type" ||
      id === "jan_1" ||
      id === "feb_1" ||
      id === "mar_1"
    ) {
      setFormData({ ...formData, [id]: value });
    } else {
      setFormData({ ...formData, [id]: parseInt(value) });
    }
  };
  const handleFormData = (data1) => {
    console.log(data1);
    data1.jan = data1.rate * 20;
    data1.feb = data1.rate * 20;
    data1.mar = data1.rate * 20;
    data1.apr = data1.rate * 20;
    data1.may = data1.rate * 20;
    data1.jun = data1.rate * 20;
    data1.jul = data1.rate * 20;
    data1.aug = data1.rate * 20;
    data1.sep = data1.rate * 20;
    data1.oct = data1.rate * 20;
    data1.nov = data1.rate * 20;
    data1.dec = data1.rate * 20;
    data1.jan_1 = "";
    data1.feb_1 = "";
    data1.mar_1 = "";
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

    data1.country1 = countryobj.country;

    console.log("updating data from the form");
    fetch("http://localhost:8000/contractor/addRow/", {
      method: "POST",
      body: JSON.stringify(data1),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => apiCall());
    handleClose();
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
    <div>
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
      <div className="apptable">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((each) => (
              <tr {...each.getHeaderGroupProps()}>
                {each.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <div>
      <button type="button" onClick={()=>
      setData(()=>updateFunc(data)[0])}>Save</button>
    </div> */}
      <Grid align="right">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          {role === true ? "Add user" : "Print"}
        </Button>
      </Grid>
      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormData={handleFormData}
      />
      {/* <div className="chartcont">
    <BarChart chartData={cd}/>
    </div> */}
    </div>
  );
};

// module.exports={ExpensesTable,country}
