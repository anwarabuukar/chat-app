
// import { resolve } from "node:dns";
import { rejects } from "assert";
import app from "../server.js";
import { serverPort,mongoDbconnString  } from "./config/index.js";
import mongoose from "mongoose"
import { error } from "console";


// import { rejects } from "node:assert";


const setupserver = ()=>new Promise(async(resolve,rejects)=>{
await mongoose.connect(mongoDbconnString) 

app.listen(serverPort, (err) => {
  if(err) return rejects(err);
  resolve(`Server is running on port ${serverPort}`);
});

})

setupserver().then((message)=>{
  console.log(message)

}).catch(console.error)
