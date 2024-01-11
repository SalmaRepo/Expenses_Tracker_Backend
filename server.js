import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"
import DBConnection from "./config/index.js"
import usersRouter from "./routers/usersRouter.js";
import expensesRouter from "./routers/expensesRouter.js"
import incomeRouter from "./routers/incomeRouter.js"
import fs from "fs";
import fileUpload from "express-fileupload"

dotenv.config();

const app=express();
app.use(express.static('./assets/'))
app.use(express.json({limit:"100mb"}));
app.use(morgan("tiny"));
app.use(fileUpload())

//create POST api/images endpoint



//DB Connection

DBConnection(); //DB Connection in config file

//cors connection

app.use(cors({origin: "http://localhost:5173", exposedHeaders: ["token"]})); 



// app.post("/api/userimages", async (req,res)=>{
//     console.log(req.body)
//     // const binaryData = new Buffer.from(req.body.image, "base64")
//     // fs.writeFileSync("./upload/1.jpg", binaryData)
//     const image = await ImageModel.create({
//         filename: Date.now()+".jpg",
//         data:req.body.image
//     })
//     console.log(image)
//     res.send({okay:image})
// })

//routers
// localhost:5000/api/users
app.use("/api/users",usersRouter);
app.use("/api/expenses",expensesRouter);
app.use("/api/incomes",incomeRouter);



//error handling

app.use((req,res,next)=>{
    res.status(404).send({msg:"Page Not Found"});
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).send(error.message || "something went wrong");
});


//listening to port

const port=process.env.PORT;
app.listen(port,()=>console.log("server connected on port 🎉",port))