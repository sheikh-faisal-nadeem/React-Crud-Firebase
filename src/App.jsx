import React, { useState } from "react";
import "./App.css";
import { db } from "./Firebase/Config";

const App = () => {

    const [data,setData]=useState({
      Name:"",
      rollNumber:""
      
    })


    const handleChange=(e)=>{
        const {name,value}=e.target;
        setData((prev)=>({
          ...prev,[name]:value
        }))
    }

    // submit Data



  return (
    <div>
      <form action="" className="form">
        <input
        name="name"
          type="text"
          placeholder="Enter your Name"
          onChange={handleChange}
          value={data.Name}
        />
        <br />
        <input
         name="rollNumber"
          type="text"
          placeholder="Enter Your Roll Number"
          onChange={handleChange}
          value={data.rollNumber}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default App;
