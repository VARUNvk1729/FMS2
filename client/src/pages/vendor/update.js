
export const updateFunc=(mock)=>{
    // console.log("from main")
    // console.log(mock)
    let updatedObject={
        CashFlow: 'Total Cash',
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
        Dec: 0
    }
    let updatedObject1={
        CashFlow: 'Total Expenses',
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
        Dec: 0
    }
    let updatedObject2={
        CashFlow: 'Ending Cash',
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
        Dec: 0
    }
    let c=1;
    let month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let k=0;
    if(mock.length<10){
        if(mock[3].CashFlow!=="Total Cash"){
            mock.splice(3,0,updatedObject);
        }
    
        if(mock[mock.length-2].CashFlow!=="Total Expenses"){
            mock.push(updatedObject1);
        }
        if(mock[mock.length-1].CashFlow!=="Ending Cash"){
        mock.push(updatedObject2);
        }
    }
    let posOfInflow=-1;
    let posOfOutflow=-1;
    for(let i=0;i<mock.length;i++){
        if(mock[i].CashFlow==="Total Cash"){
            posOfInflow=i;
        }
        if(mock[i].CashFlow==="Total Expenses"){
            posOfOutflow=i;
        }
    }

    while(c<13){
        let s=0;
        for(let i=0;i<posOfInflow;i++){
            if(mock[i].CashFlow==="Total Cash Inflow"){
                break;
            }
            s+=mock[i][month[k]];
        }
        mock[posOfInflow][month[k]]=s;
        s=0;
        for(let i=posOfInflow+1;i<mock.length;i++){
            
            if(mock[i].CashFlow==="Total Expenses"){
                break;
            }
            s+=mock[i][month[k]];
        }
        mock[posOfOutflow][month[k]]=s;
        mock[posOfOutflow+1][month[k]]=mock[posOfInflow][month[k]]-mock[posOfOutflow][month[k]]
        k++;
        c++;
    }
    
    return [mock,posOfInflow,posOfOutflow];
    
}