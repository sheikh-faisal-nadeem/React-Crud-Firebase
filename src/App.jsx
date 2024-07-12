import React, { useEffect, useState } from "react";
import "./App.css";
import { auth, db, storage } from "./Firebase/Config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, uploadBytes } from "firebase/storage";

const App = () => {
  const [localUrl, setLocalUrl] = useState("");
  const [data, setData] = useState({
    name: "",
    rollNumber: "",
    email: "",
    password: "",
  });
  const [fetch, setFetch] = useState([]);
  console.log(fetch.name);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handleImageChange

  const handleImage = (e) => {
    const file = e?.target?.files[0];
    const url = URL.createObjectURL(file);
    setLocalUrl(url);
  };

  // submit Data
  const handleSubmit = async () => {
    try {
      // Authentication===========================

      const Auth = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const uid = Auth?.user?.uid;

      // ImageUpload===========================

      const ImageUpload = ref(storage, `Test ${uid}`);
      await uploadBytes(ImageUpload);
      const ImageUrl=await getDownloadURL(ImageUpload);
          setLocalUrl(ImageUrl)

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
      <div>
        <img src={localUrl} alt="" />
      </div>
      <div className="form">
        <input
          name="Profileimage"
          type="file"
          placeholder="Enter your Name"
          onChange={handleImage}
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
          value={data.rollNumber}
        />
        <br />
        <input
          name="password"
          type="text"
          placeholder="Enter Your Password"
          onChange={handleChange}
          value={data.rollNumber}
        />
        <br />
        <button onClick={handleSubmit}>Add</button>
      </div>

      <div className="form">
        {fetch.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{item.rollNumber}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
