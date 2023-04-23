export const COLUMNS=[
    {
        Header:'Contractor Name',
        accessor:'contractorname',
    },
    {
        Header:'Country',
        accessor:'country',
    },
    {
        Header:'Dept',
        accessor:'dept',
    },
    {
        Header:'Job Title',
        accessor:'job_title'
    },
    {
        Header:'Contract Type',
        accessor:'contract_type',
    },
    {
        Header:'D/M Rate',
        accessor:'rate'
    },
    {
        Header:'Jan-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Feb-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Mar-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Apr-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'May-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Jun-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Jul-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Aug-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Sep-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Oct-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Nov-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Dec-12',
        accessor:(row)=>{
            return row.rate*20;
        }
    },
    {
        Header:'Jan-13',
        accessor:'jan_1'
    },
    {
        Header:'Feb-13',
        accessor:'feb_1'
    },
    {
        Header:'Mar-13',
        accessor:'mar_1'
    },
    {
        Header:'Total',
        accessor:(row) =>
            [row.jan, row.feb,row.mar,row.apr,row.may,row.jun,row.jul,row.aug,row.sep,row.oct, row.nov,row.dec].reduce(
              (sum, current) => sum + current,
              0
            )
    }

]