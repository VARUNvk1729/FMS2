import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import { mock } from "./expensesdata";
import BarChart from "../BarChart";
import { updateFunc } from "./update";
import { Button, Grid } from "@material-ui/core";
import FormDialog from "./dialog";

export const PayRollExp = (props) => {
  const { role } = props;

  console.log(role);
  //call api and fetch dat
  const [countryobj, setCountry] = useState({ country: "IND" });

  const [mock1, setTodos] = useState(mock);
  const apiCall = async () => {
    console.log("called apicall");

    let country = countryobj.country;
    const response = await fetch(`http://localhost:8000/payroll/${country}`);
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
  for (let i = 6; i < 14; i++) {
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
      `http://localhost:8000/payroll/deleteRow/${countryobj.country}/${data[id].ename}`,
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
    fetch(`http://localhost:8000/payroll/updateRow/${data[id].ename}`, {
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
    ename: "",
    country: "",
    Dept: "",
    jobtitle: "",
    billtype: "",
    leavedate: "",
    q1s: 0,
    hike: 0,
    q2s: 0,
    midterm_hike: "",
    q4s: 0,
    payrolltaxes: 0,
    pension: 0,
    expenses: 0,
    bonus: 0,
  });
  const onChange = (e) => {
    const { value, id } = e.target;
    //console.log({...formData,[id]:value})
    if (
      id === "ename" ||
      id === "country" ||
      id === "Dept" ||
      id === "jobtitle" ||
      id === "billtype" ||
      id === "leavedate" ||
      id === "midterm_hike" ||
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
    data1.q2s = data1.q1s + data1.q1s * data1.hike;
    data1.q4s =
      (data1.q1s + data1.q1s * data1.hike) * (1 + parseInt(data1.midterm_hike));
    let d = new Date(data1.leavedate);
    data1.jan =
      d.getMonth() + 1 < 1
        ? 0
        : (data1.q1s +
            data1.q1s * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    data1.feb =
      d.getMonth() + 1 < 2
        ? 0
        : (data1.q1s +
            data1.q1s * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    data1.mar =
      d.getMonth() + 1 < 3
        ? 0
        : (data1.q1s +
            data1.q1s * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    let v1 = data1.q1s + data1.q1s * data1.hike;
    data1.apr =
      d.getMonth() + 1 < 4
        ? 0
        : (v1 +
            v1 * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    data1.may =
      d.getMonth() + 1 < 5
        ? 0
        : (v1 +
            v1 * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    data1.jun =
      d.getMonth() + 1 < 6
        ? 0
        : (v1 +
            v1 * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    data1.jul =
      d.getMonth() + 1 < 7
        ? 0
        : (v1 +
            v1 * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    data1.aug =
      d.getMonth() + 1 < 8
        ? 0
        : (v1 +
            v1 * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    data1.sep =
      d.getMonth() + 1 < 9
        ? 0
        : (v1 +
            v1 * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    let v2 =
      (data1.q1s + data1.q1s * data1.hike) * (1 + parseInt(data1.midterm_hike));
    data1.oct =
      d.getMonth() + 1 < 10
        ? 0
        : (v2 +
            v2 * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    data1.nov =
      d.getMonth() + 1 < 11
        ? 0
        : (v2 +
            v2 * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
    data1.dec =
      d.getMonth() + 1 < 12
        ? 0
        : (v2 +
            v2 * (data1.payrolltaxes + data1.pension) +
            data1.expenses +
            data1.bonus) /
          12;
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
