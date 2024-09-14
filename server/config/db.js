import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/authproject")
    .then(()=>{console.log("connected to DB");})
    .catch((error)=>{ console.log(error);})
