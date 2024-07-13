import React, { useState } from "react";
import { auth, db, storage } from "./Firebase/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./App.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";

const App = () => {
  const [localUrl, setLocalUrl] = useState("");
  const [file, setFile] = useState("");
  const [data, setData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handleImageChange

  const handleImageChange = (e) => {
    const img = e?.target?.files[0];
    const imgUrl = URL.createObjectURL(img);
    setLocalUrl(imgUrl);
    setFile(img);
  };

  // submit Data
  const handleSubmit=()=>{
    
  }







  const handleSubmit = async () => {};

  return (
    <div>
      <div>
        <img src={localUrl} alt="" />
      </div>
      <div className="form">
        <input
          name="Profileimage"
          type="file"
          placeholder="Enter your Name"
          onChange={handleImageChange}
        />

        <input
          name="name"
          type="text"
          placeholder="Enter your Name"
          onChange={handleChange}
          value={data.name}
        />
        <br />
        <input
          name="rollNumber"
          type="number"
          placeholder="Enter Your Roll Number"
          onChange={handleChange}
          value={data.rollNumber}
        />
        <br />
        <input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
          value={data.email}
        />
        <br />
        <input
          name="password"
          type="text"
          placeholder="Enter Your Password"
          onChange={handleChange}
          value={data.password}
        />
        <br />
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default App;
