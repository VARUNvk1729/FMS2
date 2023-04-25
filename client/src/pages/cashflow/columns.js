export const COLUMNS=[
    {
        Header:'Cash Flow',
        accessor:'CashFlow',
        sticky:'left'
    },
    {
        Header:'Jan-12',
        accessor:'Jan'
    },
    {
        Header:'Feb-12',
        accessor:'Feb'
    },
    {
        Header:'Mar-12',
        accessor:'Mar'
    },
    {
        Header:'Apr-12',
        accessor:'Apr'
    },
    {
        Header:'May-12',
        accessor:'May'
    },
    {
        Header:'Jun-12',
        accessor:'Jun'
    },
    {
        Header:'Jul-12',
        accessor:'Jul'
    },
    {
        Header:'Aug-12',
        accessor:'Aug'
    },
    {
        Header:'Sep-12',
        accessor:'Sep'
    },
    {
        Header:'Oct-12',
        accessor:'Oct'
    },
    {
        Header:'Nov-12',
        accessor:'Nov'
    },
    {
        Header:'Dec-12',
        accessor:'Dec'
    },
    {
        Header:'Total',
        accessor:row =>
            [row.Jan, row.Feb,row.Mar,row.Apr,row.May,row.Jun,row.Jul,row.Aug,row.Sep,row.Oct, row.Nov,row.Dec].reduce(
              (sum, current) => sum + current,
              0
            )
    }

]