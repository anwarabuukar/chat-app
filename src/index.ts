


import app from "../server.js";
import { serverPort,mongoDbconnString, databaseName  } from "./config/index.js";
import mongoose from "mongoose"
 


const setupserver = ()=>new Promise(async(resolve,rejects)=>{
await mongoose.connect(mongoDbconnString,{
  dbName: databaseName

}) 

app.listen(serverPort, (err) => {
  if(err) return rejects(err);
  resolve(`Server is running on port ${serverPort}`);
});

})

setupserver().then((message)=>{
  console.log(message)

}).catch(console.error)
