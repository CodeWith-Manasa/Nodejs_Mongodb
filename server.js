const express=require("express");
const connectDb=require("./config/dbConnection")
const errorHandlers = require("./middleware/errorHandle");
const dotenv=require("dotenv").config();

const app=express();

connectDb();
const port=process.env.PORT|| 5000

app.use(express.json())

app.use("/api/contacts", require("./routes/contactRoutes"))

app.use("/api/users", require("./routes/usersRoutes"))

app.use(errorHandlers)

app.listen(port,()=>{
    console.log(`server is running ${port}`)
})

console.log("i am")