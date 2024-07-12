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
    const url = URL.createObjectURL(img);
    setLocalUrl(url);
    setFile(img);
  };

  // submit Data

  const handleSubmit = async () => {
    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const uid = authUser?.user?.uid;
      alert("User Creaded");
      const imageUpload = ref(storage, `Test/profileImage ${uid}`);
      await uploadBytes(imageUpload, file);

      const downloadUrl = await getDownloadURL(imageUpload);
      alert("image Uploaded");

      const collectionRef = collection(db, "Test");
      const docRef = doc(collectionRef, uid);
      const formData = {
        ...data,
        profileImage: downloadUrl,
      };
      await setDoc(docRef, formData);

      alert("Data Submited Successfully");
      setData({
        name: "",
        rollNumber: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

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
