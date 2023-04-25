import React ,{useState,useEffect} from 'react'
import {mock} from '../Expenses/expensesdata'
import './chart.css'
import BarChart from '../BarChart'
import {updateFunc} from '../Expenses/update';
import { LabelSharp } from '@mui/icons-material';

export const RevenueForcast = () => {
    //call api and fetch dat
    const [countryobj,setCountry]=useState({country:"IND"});

    const [mock1, setTodos] = useState(mock);
      const apiCall = async () => {
        console.log("called apicall")
        
        let country=countryobj.country;
        const response = await fetch(`http://localhost:8000/getCategories/revenue`);
        const jsonData = await response.json();
        console.log("got data from api")
        console.log(jsonData)
        //setTodos(jsonData);
        setData(jsonData);
      };
      useEffect(() => {
        console.log("rendered in useeffect hook")
        apiCall();
      },[countryobj]);
      //console.log(mock)
      
    //   let [newmock,setMock]=React.useState(()=>{
    //     console.log("in newmock's hook")
    //     console.log(mock)
    //     return updateFunc(mock)[0]}); 
      let [data,setData] = React.useState([])
      let labelsdata=[];
      let colarray1=[];
      let colarray2=[];
      let colarray3=[];
      let k=0;
      let countries=new Map();
      for(let i=0;i<data.length;i++){
        if(countries.has(data[i].country)==false){
            labelsdata.push(data[i].country)
            countries.set(data[i].country,k);
            colarray1.push([]);
            colarray2.push([]);
            colarray3.push([]);
            k+=1;
        }
        if(data[i].category==="Bestcase"){
            colarray1[countries.get(data[i].country)].push(data[i].sum);
        }
        if(data[i].category==="Backlog"){
            colarray2[countries.get(data[i].country)].push(data[i].sum);
        }
        if(data[i].category==="Commit"){
            colarray3[countries.get(data[i].country)].push(data[i].sum);
        }
      }
      
      //console.log(colarray);
      let cd={
        labels: labelsdata,
        datasets: [
          {
            label: "Bestcase",
            data: colarray1,
            backgroundColor: [
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2,
         },
          {
            label: "Backlog",
            data: colarray2,
            backgroundColor: [
              "#ecf0f1",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
          {
            label: "Commit",
            data: colarray3,
            backgroundColor: [
                "rgba(75,192,192,1)",
            ],
            borderColor: "black",
            borderWidth: 2,
          }
        ],
      }
     
      const [userData, setUserData] = useState(()=>{
        return cd
      });
      //comment 1
  return (
    <div>
        <h1>
            BestCase,Backlog,Commit vs Country
        </h1>
    <div className="chartcont1">
    <BarChart chartData={cd}/>
    </div>
    </div>
  )
}

// module.exports={ExpensesTable,country}

