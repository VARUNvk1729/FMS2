const {Client}=require('pg')

const client=new Client({
    host: "localhost",
    user:"postgres",
    port: 5432,
    password:"Hero@007",
    database:"Fpa"
})


module.exports=client