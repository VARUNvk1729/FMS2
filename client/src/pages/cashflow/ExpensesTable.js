import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import { mock } from "./expensesdata";
import BarChart from "../BarChart";
import { updateFunc } from "./update";
import { Button, Grid } from "@material-ui/core";
import FormDialog from "../dialog";

export const ExpensesTable = (props) => {
  //call api and fetch dat
  const { role } = props;
  const [countryobj, setCountry] = useState({ country: "IND" });

  const [mock1, setTodos] = useState(mock);
  const apiCall = async () => {
    console.log("called apicall");

    let country = countryobj.country;
    const response = await fetch(`http://localhost:8000/user/${country}`);
    const jsonData = await response.json();
    console.log("got data from api");
    console.log(jsonData);
    let inflow = [];
    let outflow = [];
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].category === "I") {
        if (
          inflow.length >= 1 &&
          jsonData[i].CashFlow !== "Total Cash" &&
          inflow[inflow.length - 1].CashFlow === "Total Cash"
        ) {
          inflow.splice(inflow.length - 2, 0, jsonData[i]);
        } else {
          inflow.push(jsonData[i]);
        }
      } else {
        if (
          outflow.length >= 1 &&
          jsonData[i].CashFlow !== "Ending Cash" &&
          jsonData[i].CashFlow !== "Total Expenses" &&
          outflow[outflow.length - 1].CashFlow === "Ending Cash"
        ) {
          outflow.splice(outflow.length - 3, 0, jsonData[i]);
        } else {
          outflow.push(jsonData[i]);
        }
      }
    }
    setTodos(jsonData);
    let finalData = inflow.concat(outflow);
    console.log("reordered the data");
    console.log(finalData);
    let newarray = [];
    for (let i = 0; i < finalData.length; i++) {
      let ob = {
        CashFlow: finalData[i].CashFlow,
        Jan: parseInt(finalData[i].Jan == null ? 0 : finalData[i].Jan),
        Feb: parseInt(finalData[i].Feb == null ? 0 : finalData[i].Feb),
        Mar: parseInt(finalData[i].Mar == null ? 0 : finalData[i].Mar),
        Apr: parseInt(finalData[i].Apr == null ? 0 : finalData[i].Apr),
        May: parseInt(finalData[i].May == null ? 0 : finalData[i].May),
        Jun: parseInt(finalData[i].Jun == null ? 0 : finalData[i].Jun),
        Jul: parseInt(finalData[i].Jul == null ? 0 : finalData[i].Jul),
        Aug: parseInt(finalData[i].Aug == null ? 0 : finalData[i].Aug),
        Sep: parseInt(finalData[i].Sep == null ? 0 : finalData[i].Sep),
        Oct: parseInt(finalData[i].Oct == null ? 0 : finalData[i].Oct),
        Nov: parseInt(finalData[i].Nov == null ? 0 : finalData[i].Nov),
        Dec: parseInt(finalData[i].Dec == null ? 0 : finalData[i].Dec),
      };
      newarray.push(ob);
    }
    console.log("table data from api");
    console.log(newarray);
    setMock(newarray);
    setData(newarray);
  };
  useEffect(() => {
    console.log("rendered in useeffect hook");
    apiCall();
  }, [countryobj]);
  //console.log(mock)

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
        <button
          type="button"
          class="btn btn-info"
          onClick={() => handleUpdate(index)}
        >
          Update
        </button>

        <button
          type="button"
          class="btn btn-warning"
          onClick={() => handleDelete(index)}
        >
          Delete
        </button>
      </div>
    );
  };
  //comment 3

  if (role === true) {
    if (COLUMNS[COLUMNS.length - 1].Header !== "Delete") {
      COLUMNS.push({
        Header: "Delete",
        accessor: "deleteBtn",
      });
    }
    for (let i = 1; i < 13; i++) {
      COLUMNS[i].Cell = EditableNumberCell;
    }
    COLUMNS[14].Cell = DeleteBtn;
  }

  const handleDelete = (id) => {
    let c = { country: countryobj.country };
    //console.log(data[id].CashFlow);
    fetch(
      `http://localhost:8000/deleteRow/${countryobj.country}/${data[id].CashFlow}`,
      { method: "DELETE" }
    ).then((resp) => apiCall());
  };

  //   COLUMNS[14].Cell=()=>{

  //     return <div>
  //       <Button variant="outlined" color="primary" onClick={handleDelete("1")}>Update</Button>
  //       <Button variant="outlined" color="secondary" onClick={handleDelete("1")} >Delete</Button>
  //       </div>
  // }
  //comment 2

  const columns = useMemo(() => COLUMNS, []);

  let [newmock, setMock] = React.useState(() => {
    console.log("in newmock's hook");
    console.log(mock);
    return updateFunc(mock)[0];
  });
  let [data, setData] = React.useState(newmock);
  let a = updateFunc(data);
  data = a[0];
  let pi = a[1];
  let pf = a[2];

  let colarray = [];
  let month = [
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
  ];
  let colarray2 = [];
  let colarray3 = [];
  for (let k = 0; k < 12; k++) {
    colarray2.push(data[pi][month[k]]);
    colarray.push(data[pf][month[k]]);
    colarray3.push(data[pf + 1][month[k]]);
  }
  //console.log(colarray);
  let cd = {
    labels: month,
    datasets: [
      {
        label: "Total Cash InFlow",
        data: colarray2,
        backgroundColor: ["#2a71d0"],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Total Expenses",
        data: colarray,
        backgroundColor: ["#ecf0f1"],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        type: "line",
        label: "Total Ending Cash",
        data: colarray3,
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
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
    setUserData(cd);
  };

  const handleUpdate = (id) => {
    let total = 0;
    let upobj = data[id];
    for (let k = 0; k < 12; k++) {
      total += data[month[k]];
    }
    upobj.Total = total;
    //console.log(upobj);

    if (id < pi) {
      upobj.category = "I";
    } else {
      upobj.category = "E";
    }
    upobj.country = countryobj.country;
    //console.log(data[id].CashFlow);
    fetch(`http://localhost:8000/updateRow/${data[id].CashFlow}`, {
      method: "PUT",
      body: JSON.stringify(upobj),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => apiCall());
  };

  const [userData, setUserData] = useState(() => {
    return cd;
  });
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
    CashFlow: "",
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
    category: "I",
  });
  const onChange = (e) => {
    const { value, id } = e.target;
    //console.log({...formData,[id]:value})
    if (id === "CashFlow") {
      setFormData({ ...formData, [id]: value });
    } else if (id === "inflow" || id === "expense") {
      setFormData({ ...formData, category: value });
    } else {
      setFormData({ ...formData, [id]: parseInt(value) });
    }
  };
  const handleFormData = (data) => {
    let total = 0;
    for (let k = 0; k < 12; k++) {
      total += data[month[k]];
    }
    data.Total = total;
    console.log(data);
    data.country = countryobj.country;

    console.log("updating data from the form");
    fetch("http://localhost:8000/addRow/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    }).then((resp) => apiCall());
  };
  const onSelection = (e) => {
    let val = e.target.value;
    //console.log(val);
    console.log({ ...countryobj, country: val });
    setCountry({ ...countryobj, country: val });
    console.log("updationg country");
    console.log(countryobj.country);
    //apiCall();
  };

  // const handleDelete=(id)=>{
  //   console.log(id);
  //   // fetch('http://localhost:8000/deleteRow'+`/${id}`,{method:"DELETE"}).then(resp=>apiCall());

  // }
  return (
    <div>
      <div>
        <h1 className="head">
          CashFlow For{" "}
          {countryobj.country === "IND"
            ? "India"
            : countryobj.country === "AUS"
            ? "Australia"
            : "United States of America"}
        </h1>
        <img
          src="https://img.freepik.com/free-vector/abstract-graphic-logo_1043-36.jpg?w=740&t=st=1679981990~exp=1679982590~hmac=0eafc258c552b9e4f03763531ac0c6689846ae65a2d1d8421f1f8f9134c7fe07"
          width="15%"
        />
      </div>
      <div>
        <label htmlFor="countries">Select the country</label>
        <select name="countries" id="cars" onChange={onSelection}>
          <option value="IND">India</option>
          <option value="AUS">Australia</option>
          <option value="USA">USA</option>
        </select>
      </div>
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
      <div className="chartcont">
        <BarChart chartData={cd} />
      </div>
    </div>
  );
};

// module.exports={ExpensesTable,country}
