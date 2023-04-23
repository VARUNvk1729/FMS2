// export const COLUMNS = [
//   {
//     Header: "CustomerName",
//     accessor: "CustomerName",
//   },
//   {
//     Header: "ProjectName",
//     accessor: "ProjectName",
//   },
//   {
//     Header: "Category",
//     accessor: "category",
//   },
//   {
//     Header: "Country",
//     accessor: "Country",
//   },
//   {
//     Header: "Opening-backlog",
//     accessor: "openbacklog",
//   },
//   {
//     Header: "Closing-backlog",
//     accessor: "closebacklog",
//   },
//   {
//     Header: "Orderdate",
//     accessor: "orderdate",
//   },
//   {
//     Header: "Orderamount",
//     accessor: "orderamount",
//   },
//   {
//     Header: "Revenuetype",
//     accessor: "revenuetype",
//   },
//   {
//     Header: "Contract-type",
//     accessor: "contracttype",
//   },
//   {
//     Header: "Jan-12",
//     accessor: "Jan",
//   },
//   {
//     Header: "Feb-12",
//     accessor: "Feb",
//   },
//   {
//     Header: "Mar-12",
//     accessor: "Mar",
//   },
//   {
//     Header: "Apr-12",
//     accessor: "Apr",
//   },
//   {
//     Header: "May-12",
//     accessor: "May",
//   },
//   {
//     Header: "Jun-12",
//     accessor: "Jun",
//   },
//   {
//     Header: "Jul-12",
//     accessor: "Jul",
//   },
//   {
//     Header: "Aug-12",
//     accessor: "Aug",
//   },
//   {
//     Header: "Sep-12",
//     accessor: "Sep",
//   },
//   {
//     Header: "Oct-12",
//     accessor: "Oct",
//   },
//   {
//     Header: "Nov-12",
//     accessor: "Nov",
//   },
//   {
//     Header: "Dec-12",
//     accessor: "Dec",
//   },
//   {
//     Header: "Total",
//     accessor: (row) =>
//       [
//         row.Jan,
//         row.Feb,
//         row.Mar,
//         row.Apr,
//         row.May,
//         row.Jun,
//         row.Jul,
//         row.Aug,
//         row.Sep,
//         row.Oct,
//         row.Nov,
//         row.Dec,
//       ].reduce((sum, current) => sum + current, 0),
//   },
//   {
//     Header: "PO-in-excess-forecast",
//     accessor: "po",
//   },
//   {
//     Header: "unused-po",
//     accessor: "unusedpo",
//   },
//   {
//     Header: "Dev-centre-payment",
//     accessor: "devcentrepayment",
//   },
//   {
//     Header: "Difference",
//     accessor: "difference",
//   },
//   {
//     Header: "OFF",
//     accessor: "off",
//   },
// ];

export const COLUMNS = [
  {
    Header: "CustomerName",
    accessor: "CustomerName",
  },
  {
    Header: "ProjectName",
    accessor: "ProjectName",
  },
  {
    Header: "Category",
    accessor: "category",
  },

  {
    Header: "Opening-backlog",
    accessor: "openbacklog",
  },
  {
    Header: "Closing-backlog",
    accessor: (row) => {
      let ans = [
        row.Jan,
        row.Feb,
        row.Mar,
        row.Apr,
        row.May,
        row.Jun,
        row.Jul,
        row.Aug,
        row.Sep,
        row.Oct,
        row.Nov,
        row.Dec,
      ].reduce((sum, current) => sum + current, 0);
      return row.openbacklog + row.orderamount - ans;
    },
  },
  {
    Header: "Orderdate",
    accessor: "orderdate",
  },
  {
    Header: "Orderamount",
    accessor: "orderamount",
  },
  {
    Header: "Revenuetype",
    accessor: "revenuetype",
  },
  {
    Header: "Contract-type",
    accessor: "contracttype",
  },
  {
    Header: "Jan-12",
    accessor: "Jan",
  },
  {
    Header: "Feb-12",
    accessor: "Feb",
  },
  {
    Header: "Mar-12",
    accessor: "Mar",
  },
  {
    Header: "Apr-12",
    accessor: "Apr",
  },
  {
    Header: "May-12",
    accessor: "May",
  },
  {
    Header: "Jun-12",
    accessor: "Jun",
  },
  {
    Header: "Jul-12",
    accessor: "Jul",
  },
  {
    Header: "Aug-12",
    accessor: "Aug",
  },
  {
    Header: "Sep-12",
    accessor: "Sep",
  },
  {
    Header: "Oct-12",
    accessor: "Oct",
  },
  {
    Header: "Nov-12",
    accessor: "Nov",
  },
  {
    Header: "Dec-12",
    accessor: "Dec",
  },
  {
    Header: "Jan-12",
    accessor: "Jan1",
  },
  {
    Header: "Feb-12",
    accessor: "Feb1",
  },
  {
    Header: "Mar-12",
    accessor: "Mar1",
  },

  {
    Header: "Total",
    accessor: (row) =>
      [
        row.Jan,
        row.Feb,
        row.Mar,
        row.Apr,
        row.May,
        row.Jun,
        row.Jul,
        row.Aug,
        row.Sep,
        row.Oct,
        row.Nov,
        row.Dec,
      ].reduce((sum, current) => sum + current, 0),
  },
  {
    Header: "PO-in-excess-forecast",
    accessor: (row) => {
      let ans = [
        row.Jan,
        row.Feb,
        row.Mar,
        row.Apr,
        row.May,
        row.Jun,
        row.Jul,
        row.Aug,
        row.Sep,
        row.Oct,
        row.Nov,
        row.Dec,
        row.Jan1,
        row.Feb1,
        row.Mar1,
      ].reduce((sum, current) => sum + current, 0);
      return row.openbacklog + row.orderamount - ans;
    },
  },
  {
    Header: "unused-po",
    accessor: "unusedpo",
  },
  {
    Header: "Dev-centre-payment",
    accessor: (row) => {
      let ans = [
        row.Jan,
        row.Feb,
        row.Mar,
        row.Apr,
        row.May,
        row.Jun,
        row.Jul,
        row.Aug,
        row.Sep,
        row.Oct,
        row.Nov,
        row.Dec,
      ].reduce((sum, current) => sum + current, 0);
      return ans * 0.8;
    },
  },
  {
    Header: "Difference",
    accessor: (row) => {
      let ans = [
        row.Jan,
        row.Feb,
        row.Mar,
        row.Apr,
        row.May,
        row.Jun,
        row.Jul,
        row.Aug,
        row.Sep,
        row.Oct,
        row.Nov,
        row.Dec,
      ].reduce((sum, current) => sum + current, 0);
      return ans * 0.2;
    },
  },
  {
    Header: "OFF",
    accessor: "off",
  },
];
