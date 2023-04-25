export const COLUMNS=[
    {
        Header:'Form of Expense',
        accessor:'expense',
    },
    {
        Header:'Jan-12',
        accessor:'jan'
    },
    {
        Header:'Feb-12',
        accessor:'feb'
    },
    {
        Header:'Mar-12',
        accessor:'mar'
    },
    {
        Header:'Apr-12',
        accessor:'apr'
    },
    {
        Header:'May-12',
        accessor:'may'
    },
    {
        Header:'Jun-12',
        accessor:'jun'
    },
    {
        Header:'Jul-12',
        accessor:'jul'
    },
    {
        Header:'Aug-12',
        accessor:'aug'
    },
    {
        Header:'Sep-12',
        accessor:'sep'
    },
    {
        Header:'Oct-12',
        accessor:'oct'
    },
    {
        Header:'Nov-12',
        accessor:'nov'
    },
    {
        Header:'Dec-12',
        accessor:'dec'
    },
    {
        Header:'Total',
        accessor:row =>
            [row.jan, row.feb,row.mar,row.apr,row.may,row.jun,row.jul,row.aug,row.sep,row.oct, row.nov,row.dec].reduce(
              (sum, current) => sum + current,
              0
            )
    }

]