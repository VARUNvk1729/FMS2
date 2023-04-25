
export const updateFunc=(mock)=>{
    
    let updatedObject={
        CashFlowIndia: 'Total Cash Inflow',
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
    while(c<13){
        let s=0;
        for(let i=0;i<mock.length;i++){
            if(mock[i].CashFlowIndia==="Total Cash Inflow"){
                break;
            }
            s+=mock[i][month[k]];
        }
        updatedObject[month[k]]=s;
        k++;
        c++;
    }
    // console.log("this is from update function")
    // console.log(updatedObject); 
    if(mock.length===4){
        //console.log("the length is already 4")
    mock[mock.length-1]=updatedObject;
    return mock;
    }
    else{
        return [...mock,updatedObject];
    }
}


