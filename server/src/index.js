const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const db = require("./db");
const jwt = require("jsonwebtoken");
const session = require("express-session");

//const express = require("express");
const bodyparser = require("body-parser");
//const cors = require("cors");
//const app = express();
//app.use(cors());
const { response, request } = require("express");
const res = require("express/lib/response");

let table = "cash";
console.log(table);

//import passport middleware
require("./middlewares/passport-middleware");

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//import routes
const authRoutes = require("./routes/auth");

//initialize routes
app.use("/api", authRoutes);

//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: false }));

app.get("/user/:country", async (request, response) => {
  let { country } = request.params;
  table = "cash" + country;

  const res = await db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.post("/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    CashFlow,
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec,
    category,
    country,
  } = request.body;
  console.log(category);
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "cash" + country;
  let q = `insert into ${table}("CashFlow","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov"
            ,"Dec","category")
          values('${CashFlow}','${Jan}','${Feb}','${Mar}','${Apr}','${May}','${Jun}','${Jul}','${Aug}','${Sep}','${Oct}','${Nov}','${Dec}','${category}');`;
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");

  //}
});

app.delete("/deleteRow/:id/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { id, name } = request.params;
    table = "cash" + id;
    console.log(name);
    console.log(id);
    const res = db.query(`delete from ${table} where "CashFlow"='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      CashFlow,
      Jan,
      Feb,
      Mar,
      Apr,
      May,
      Jun,
      Jul,
      Aug,
      Sep,
      Oct,
      Nov,
      Dec,
      category,
      country,
    } = request.body;
    console.log(name);
    table = "cash" + country;
    console.log(table);
    console.log(request.body);
    const res =
      db.query(`update ${table} set "CashFlow"='${CashFlow}',"Jan"='${Jan}',"Feb"='${Feb}',"Mar"='${Mar}',"Apr"='${Apr}',"May"='${May}',"Jun"='${Jun}',"Jul"='${Jul}',"Aug"='${Aug}',"Sep"='${Sep}',"Oct"='${Oct}',"Nov"='${Nov}'
        ,"Dec"='${Dec}',"category"='${category}' where "CashFlow"='${name}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});

//Contractor table
//vendor
app.get("/vendor", async (request, response) => {
  table = "vendor";
 
  const res = await db.query(`SELECT * FROM ${table} order by vendors`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});
 
app.put("/vendor/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      vendors,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      total,
    } = request.body;
    console.log(name);
    table = "vendor";
    console.log(table);
    console.log(request.body);
 
    const res =
      db.query(`update ${table} set vendors='${vendors}',jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
        ,dec=${dec},total=${total} where vendors='${vendors}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});
 
app.delete("/vendor/deleteRow/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { name } = request.params;
    table = "vendor";
    console.log(name);
    const res = db.query(`delete from ${table} where vendors='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});
 
app.post("/vendor/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    vendors,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    total,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "vendor";
 
  let q = `insert into ${table}(vendors,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,total)
          values('${vendors}',${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov},${dec},${total});`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");
 
  //}
});

//office and opex
app.get("/office", async (request, response) => {
  table = "office";
 
  const res = await db.query(`SELECT * FROM ${table} order by expenses`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});
 
app.put("/office/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      expenses,
      date,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      total,
    } = request.body;
    console.log(name);
    table = "office";
    console.log(table);
    console.log(request.body);
 
    const res =
      db.query(`update ${table} set expenses='${expenses}',date='${date}',jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
          ,dec=${dec},total=${total} where expenses='${expenses}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});
 
app.delete("/office/deleteRow/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { name } = request.params;
    table = "office";
    console.log(name);
    const res = db.query(`delete from ${table} where expenses='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});
 
app.post("/office/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    expenses,
    date,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    total,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "office";
 
  let q = `insert into ${table}(expenses,date,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,total)
            values('${expenses}','${date}',${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov},${dec},${total});`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");
 
  //}
});
 
//for operating expenses
app.get("/opex", async (request, response) => {
  table = "opex";
 
  const res = await db.query(`SELECT * FROM ${table} order by expense`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});
 
app.delete("/opex/deleteRow/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { name } = request.params;
    table = "opex";
    console.log(name);
    const res = db.query(`delete from ${table} where expense='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});
 
app.post("/opex/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    expense,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    total,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "opex";
 
  let q = `insert into ${table}(expense,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,total)
      values('${expense}',${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov},${dec},${total});`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");
 
  //}
});
 
app.put("/opex/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      expense,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      total,
    } = request.body;
    console.log(name);
    console.log("updating")
    table = "opex";
    console.log(table);
    console.log(request.body);
 
    const res =
      db.query(`update ${table} set expense='${expense}',jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
    ,dec=${dec},total=${total} where expense='${expense}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});
//Capital Expense
app.get("/capital", async (request, response) => {
  table = "capital";

  const res = await db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.put("/capital/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      item,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      total,
    } = request.body;
    console.log(name);
    table = "capital";
    console.log(table);
    console.log(request.body);

    const res =
      db.query(`update ${table} set item='${item}',jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
          ,dec=${dec},total=${total} where item='${name}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/capital/deleteRow/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { name } = request.params;
    table = "capital";
    console.log(name);
    const res = db.query(`delete from ${table} where item='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/capital/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    item,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    total,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "capital";

  let q = `insert into ${table}(item,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov
          ,dec,total)
            values('${item}',${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov},${dec},${total});`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");

  //}
});



app.get("/revenue/:country", async (request, response) => {
  let { country } = request.params;
  table = "cash" + country;

  const res = await db.query(
    `select * from "revenueIND";`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});

app.post("/revenue/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    customername,
    projectname,
    category,
    openingbacklog,
    closingbacklog,
    orderdate,
    orderamount,
    revenuetype,
    contracttype,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    jan1,
    feb1,
    mar1,
    total,
    poexcess,
    unusedpo,
    devcentre,
    difference,
    off,
    country1,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "revenue" + country1;

  let q = `insert into "${table}"( customername,
        projectname,
        category,
        openingbacklog,
        closingbacklog,
        orderdate,
        orderamount,
        revenuetype,
        contracttype,
        jan,
        feb,
        mar,
        apr,
        may,
        jun,
        jul,
        aug,
        sep,
        oct,
        nov,
        dec,
        jan1,
        feb1,
        mar1,
        total,
        poexcess,
        unusedpo,
        devcentre,
        difference,
        off)
        values('${customername}','${projectname}','${category}',${openingbacklog},${closingbacklog},
        '${orderdate}', ${orderamount}, '${revenuetype}','${contracttype}',
        ${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov}
        ,${dec},${jan1},${feb1},${mar1},${total},${poexcess},${unusedpo},${devcentre},${difference},'${off}');`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");

  //}
});

app.delete("/revenue/deleteRow/:id/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { id, name } = request.params;
    table = "revenue" + id;
    console.log(name);
    console.log(id);
    const res = db.query(`delete from "${table}" where customername='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/revenue/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      customername,
      projectname,
      category,
      openingbacklog,
      closingbacklog,
      orderdate,
      orderamount,
      revenuetype,
      contracttype,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      jan1,
      feb1,
      mar1,
      total,
      poexcess,
      unusedpo,
      devcentre,
      difference,
      off,
      country1,
    } = request.body;
    console.log(name);
    table = "revenue" + country1;
    console.log(table);
    console.log(request.body);

    const res =
      db.query(`update "${table}" set customername='${customername}',projectname='${projectname}',category ='${category}',openingbacklog=${openingbacklog},closingbacklog=${closingbacklog},
      orderdate='${orderdate}', orderamount=${orderamount}, revenuetype='${revenuetype}',contracttype='${contracttype}',
      jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
      ,dec=${dec},jan1=${jan1},feb1=${feb1},mar1=${mar1},total=${total},poexcess=${poexcess},unusedpo=${unusedpo},devcentre=${devcentre},difference=${difference},off='${off}' where customername='${customername}'`);

    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});

//app.listen(8000, () => console.log("listening to the port 000 ..."));

//ADDING USERS
app.post("/api/user/register", (req, res) => {
  const { username, email, password, role } = req.body;
  db.query(
    `INSERT INTO users1 (name, email, password, role) VALUES ('${username}', '${email}', '${password}','${role}')`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ message: "User registered successfully" });
      }
    }
  );
});

app.post("/login/user", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      } else if (results.length === 0) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          } else if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
          } else {
            const token = jwt.sign({ id: user.id }, "secret_key");
            res.status(200).json({ token });
          }
        });
      }
    }
  );
});

// app.get("/api/users/protected", async (req, res) => {
//   try {
//     const { rows } = await db.query(
//       "SELECT user_id, email, role, name FROM users1;"
//       // [userId]
//     );

//     res.status(200).json({ data: rows });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

app.get("/api/users/:id", async (req, res) => {
  let { id } = req.params;

  try {
    const { rows } = await db.query(
      `SELECT user_id, email, role, name FROM users1 WHERE email='${id}'`
    );

    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/payroll", async (request, response) => {
  table = "payroll";

  const res = await db.query(`SELECT * FROM ${table} order by payroll`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});
app.get("/payroll/check/:name", async (request, response) => {
  table = "payroll";
  let {name}=request.params;
  const res = await db.query(`SELECT * FROM ${table} where payroll='${name}'`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.put("/payroll/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      payroll,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      total,
    } = request.body;
    console.log(name);
    table = "payroll";
    console.log(table);
    console.log(request.body);

    const res =
      db.query(`update ${table} set payroll='${payroll}',jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
        ,dec=${dec},total=${total} where payroll='${name}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/payroll/deleteRow/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { name } = request.params;
    table = "payroll";
    console.log(name);
    const res = db.query(`delete from ${table} where payroll='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/payroll/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    payroll,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    total,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "payroll";

  let q = `insert into ${table}(payroll,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov
        ,dec,total)
          values('${payroll}',${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov},${dec},${total});`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");

  //}
});

//REVENUE

app.get("/revenue", async (request, response) => {
  table = "revenue1";

  const res = await db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.put("/revenue/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      projectname,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      total,
    } = request.body;
    console.log(name);
    table = "revenue1";
    console.log(table);
    console.log(request.body);

    const res =
      db.query(`update ${table} set projectname='${projectname}',jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
          ,dec=${dec},total=${total} where projectname='${name}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/revenue/deleteRow/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { name } = request.params;
    table = "revenue1";
    console.log(name);
    const res = db.query(`delete from ${table} where projectname='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/revenue/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    projectname,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    total,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "revenue1";

  let q = `insert into ${table}(projectname,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov
          ,dec,total)
            values('${projectname}',${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov},${dec},${total});`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");

  //}
});

//for dashboard
app.get("/getStatistics/payroll", async (request, response) => {
  const res = await db.query(
    `select sum(jan) as jan,sum(feb) as feb,sum(mar) as mar,sum(apr) as apr,sum(may) as may,sum(jun) as jun,sum(jul) as jul,sum(aug) as aug,sum(sep) as sep
  ,sum(oct) as oct,sum(nov)as nov,sum(dec) as dec,sum(total) as total from payroll;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});
app.get("/getStatistics/opex", async (request, response) => {
  const res = await db.query(
    `select sum(jan) as jan,sum(feb) as feb,sum(mar) as mar,sum(apr) as apr,sum(may) as may,sum(jun) as jun,sum(jul) as jul,sum(aug) as aug,sum(sep) as sep
  ,sum(oct) as oct,sum(nov)as nov,sum(dec) as dec,sum(total) as total from opex;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});
app.get("/getStatistics/vendor", async (request, response) => {
  const res = await db.query(
    `select sum(jan) as jan,sum(feb) as feb,sum(mar) as mar,sum(apr) as apr,sum(may) as may,sum(jun) as jun,sum(jul) as jul,sum(aug) as aug,sum(sep) as sep
  ,sum(oct) as oct,sum(nov)as nov,sum(dec) as dec,sum(total) as total from vendor;`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});
// for dashboard
app.get("/dashboard", async (request, response) => {
  table = "dashboard";

  const res = await db.query(`SELECT * FROM ${table} `, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.put("/dashboard/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      expense,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      total,
    } = request.body;
    console.log(name);
    table = "dashboard";
    console.log(table);
    console.log(request.body);

    const res =
      db.query(`update ${table} set expense='${expense}',jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
        ,dec=${dec},total=${total} where expense='${name}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/dashboard/deleteRow/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { name } = request.params;
    table = "dashboard";
    console.log(name);
    const res = db.query(`delete from ${table} where expense='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/dashboard/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    expense,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    total,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "dashboard";

  let q = `insert into ${table}(expense,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov
        ,dec,total)
          values('${expense}',${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov},${dec},${total});`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");

  //}
});
//vendor
app.get("/contractor", async (request, response) => {
  table = "vendor";

  const res = await db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.put("/contractor/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      vendors,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      total,
    } = request.body;
    console.log(name);
    table = "vendor";
    console.log(table);
    console.log(request.body);

    const res =
      db.query(`update ${table} set vendors='${vendors}',jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
        ,dec=${dec},total=${total} where vendors='${vendors}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/contractor/deleteRow/:id/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { name } = request.params;
    table = "vendors";
    console.log(name);
    console.log(id);
    const res = db.query(`delete from ${table} where vendors='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/contractor/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    vendors,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    total,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "vendor";

  let q = `insert into ${table}(vendors,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,total)
          values('${vendors}',${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov},${dec},${total});`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");

  //}
});

//office table
app.get("/office", async (request, response) => {
  table = "office";

  const res = await db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.put("/office/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      expenses,
      date,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      total,
    } = request.body;
    console.log(name);
    table = "office";
    console.log(table);
    console.log(request.body);

    const res =
      db.query(`update ${table} set expenses='${expenses}',date='${date}',jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
          ,dec=${dec},total=${total} where expenses='${expenses}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/office/deleteRow/:id/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { name } = request.params;
    table = "office";
    console.log(name);
    console.log(id);
    const res = db.query(`delete from ${table} where expenses='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/office/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    expenses,
    date,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    total,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "office";

  let q = `insert into ${table}(expenses,date,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,total)
            values('${expenses}','${date}',${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov},${dec},${total});`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");

  //}
});

//for operating expenses
app.get("/opex", async (request, response) => {
  table = "opex";

  const res = await db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.delete("/opex/deleteRow/:name", async (request, response) => {
  try {
    console.log(request.params);
    let { name } = request.params;
    table = "opex";
    console.log(name);
    const res = db.query(`delete from ${table} where expense='${name}'`);
    response.send("Row Successfully Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/opex/addRow/", async (request, response) => {
  console.log("from post request");
  console.log(request.body);
  const {
    expense,
    jan,
    feb,
    mar,
    apr,
    may,
    jun,
    jul,
    aug,
    sep,
    oct,
    nov,
    dec,
    total,
  } = request.body;
  // const selectUserQuery =`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`;
  // const dbUser = await db.query(selectUserQuery);
  // console.log(`SELECT * FROM cashUSA WHERE "CashFlow" = '${CashFlow}'`);
  // console.log(dbUser)
  // if (dbUser !== undefined) {
  //   response.status(400);
  //   response.send("User already exists");
  // } else {
  table = "opex";

  let q = `insert into ${table}(expense,jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec,total)
      values('${expense}',${jan},${feb},${mar},${apr},${may},${jun},${jul},${aug},${sep},${oct},${nov},${dec},${total});`;
  console.log(q);
  const res = await db.query(q);
  response.status(200);
  response.send("Row added created successfully");

  //}
});

app.put("/opex/updateRow/:name", async (request, response) => {
  try {
    let { name } = request.params;
    const {
      expense,
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
      total,
    } = request.body;
    console.log(name);
    table = "opex";
    console.log(table);
    console.log(request.body);

    const res =
      db.query(`update ${table} set expense='${expense}',jan=${jan},feb=${feb},mar=${mar},apr=${apr},may=${may},jun=${jun},jul=${jul},aug=${aug},sep=${sep},oct=${oct},nov=${nov}
    ,dec=${dec},total=${total} where expense='${expense}'`);
    response.send("Row Successfully Updated");
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/getEmployees", async (request, response) => {
  table = "payroll";

  const res = await db.query(`SELECT count(payroll) FROM ${table}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});
app.get("/getProjects", async (request, response) => {
  table = "revenue1";

  const res = await db.query(`SELECT count(projectname) FROM ${table}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});
app.get("/getVendors", async (request, response) => {
  table = "vendor";

  const res = await db.query(`SELECT count(vendors) FROM ${table}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.get("/payroll/check/:name", async (request, response) => {
  table = "payroll";
  let {name}=request.params;
  const res = await db.query(`SELECT * FROM ${table} where payroll='${name}'`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.get("/capital/check/:name", async (request, response) => {
  table = "capital";
  let {name}=request.params;
  const res = await db.query(`SELECT * FROM ${table} where item='${name}'`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.get("/office/check/:name", async (request, response) => {
  table = "office";
  let {name}=request.params;
  const res = await db.query(`SELECT * FROM ${table} where expenses='${name}'`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.get("/opex/check/:name", async (request, response) => {
  table = "opex";
  let {name}=request.params;
  const res = await db.query(`SELECT * FROM ${table} where expense='${name}'`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.get("/vendor/check/:name", async (request, response) => {
  table = "vendor";
  let {name}=request.params;
  const res = await db.query(`SELECT * FROM ${table} where vendors='${name}'`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

appStart();
