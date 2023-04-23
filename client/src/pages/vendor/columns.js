export const COLUMNS=[
    {
        Header:'vendors',
        accessor:'vendors',
        sticky: 'left'
    },
    {
        Header:'jan',
        accessor:'jan'
    },
    {
        Header:'feb',
        accessor:'feb'
    },
    {
        Header:'mar',
        accessor:'mar'
    },
    {
        Header:'apr',
        accessor:'apr'
    },
    {
        Header:'may',
        accessor:'may'
    },
    {
        Header:'jun',
        accessor:'jun'
    
    },
    {
        Header:'jul',
        accessor: 'jul'
    },
    {
        Header:'aug',
        accessor:'aug'
    },
    {
        Header:'sep',
        accessor:'sep'
    },
    {
        Header:'oct',
        accessor:'oct'
    },
    {
        Header:'nov',
        accessor:'nov'
    },
    {
        Header:'dec',
        accessor:'dec'
    },
    {
        Header:'total',
        accessor:(row) =>
            [row.jan, row.feb,row.mar,row.apr,row.may,row.jun,row.jul,row.aug,row.sep,row.oct, row.nov,row.dec].reduce(
              (sum, current) => sum +current,
              0
            )
    }
]