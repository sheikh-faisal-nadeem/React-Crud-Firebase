import React, { useState } from "react";
import "./App.css";
import { db } from "./Firebase/Config";
import { addDoc, collection } from "firebase/firestore";

const App = () => {
  const [data, setData] = useState({
    name: "",
    rollNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // submit Data
  const handleSubmit = async () => {
    try {
      const collectionRef = collection(db, "test");
      await addDoc(collectionRef, data);
      alert("Data Submited Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="form">
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
          type="number"
          placeholder="Enter Your Roll Number"
          onChange={handleChange}
          value={data.rollNumber}
        />
        <button onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default App;
