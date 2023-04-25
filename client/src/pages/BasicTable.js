import React ,{useMemo,useState} from 'react'
import {useTable} from 'react-table'
import { COLUMNS } from './columns'
import {mock} from './mock'

import BarChart from './BarChart'
import {updateFunc} from './update';

export const BasicTable = () => {
    //call api and fetch data
    // const apiCall = async () => {
    //     const response = await fetch('http://localhost:3005/movies/');
    //     const jsonData = await response.json();
    //     console.log(jsonData);
    //   };
    //   apiCall();
    

    const EditableNumberCell = ({
        cell: { value },
        row: { index },
        column: { id },
        updateMyData // This is a custom function that we supplied to our table instance
      }) => {
        const onChange = e => {
          updateMyData(index, id, parseInt(e.target.value, 10));
        };
      
        return <input value={value} onChange={onChange} type="number" />;
      };
    //comment 3

      for(let i=1;i<13;i++){
        COLUMNS[i].Cell=EditableNumberCell
      }
      //comment 2
    
    const columns=useMemo(()=>COLUMNS,[])
      let [newmock,setMock]=React.useState(()=>{
        return updateFunc(mock)}); 
      let [data,setData] = React.useState(newmock)
      data=updateFunc(data)
      let colarray=[];
      let month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

      for(let k=0;k<12;k++){
        colarray.push(data[3][month[k]]);
      }
      console.log(colarray);
      let cd={
        labels: month,
        datasets: [
          {
            label: "Total Cash Inflow",
            data: colarray,
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      }
      const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          })
        )
        console.log(data[rowIndex]);
        setMock(data);
        setUserData(cd);
      }
      
      
      const [userData, setUserData] = useState(()=>{
        return cd
      });
      //comment 1
      
    const tableInstance =useTable({
        columns,data:data,
        updateMyData,
    })

    

    const{
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    }=tableInstance
  return (
    <div>
    <div className='apptable'>
    <table {...getTableProps()}>
        <thead>
            {
                headerGroups.map((each)=>(
                    <tr {...each.getHeaderGroupProps()}>
                        {each.headers.map((column)=>(
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}  
                    </tr>
                ))}
            
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                rows.map((row)=>{
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell)=>{
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
    </div>
    <div>
      <button type="button" onClick={()=>
      setData(()=>updateFunc(data))}>Save</button>
    </div>
    <div className="chartcont">
    <BarChart chartData={cd}/>
    </div>
    </div>
  )
}

