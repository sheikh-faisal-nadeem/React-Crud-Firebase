import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./Firebase/Config";
import { addDoc, collection, getDocs } from "firebase/firestore";

const App = () => {
  const [data, setData] = useState({
    name: "",
    rollNumber: "",
  });
  const [fetch, setFetch] = useState();
  console.log(fetch.name)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
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

  // Fetch Data

  const fetchData = async () => {
    try {
      const collectionRef = collection(db, "test");
      const response = await getDocs(collectionRef);
      setFetch(
        response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  // UseState

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="form">
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
        <button onClick={handleSubmit}>Add</button>
      </div>

      <div>
        {fetch.map((item, index) => {
          <div key={index}>
            <div>{item.name}</div>
            <div>{item.rollNumber}</div>
          </div>
        })}
      </div>
    </div>
  );
};

export default App;
