import React, { useEffect, useState } from "react";
import { db } from "./Firebase/Config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const App = () => {
  const [formValue, setFormValue] = useState({
    Name: "",
    fatherName: "",
  });
  const [fetch, setFetch] = useState([]);
  const [show, setShow] = useState(false);
  const [editID,setEditID]=useState(null)

  // Submit Data============

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collectionRef = collection(db, "Demo");
      await addDoc(collectionRef, formValue);
      alert("Data Submitted Successfully");
      fetchData();
      setFormValue({
        Name: "",
        fatherName: "",
      });
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  };

  //  Fetch Data=============

  const fetchData = async () => {
    try {
      const collectionRef = collection(db, "Demo");
      const response = await getDocs(collectionRef);
      setFetch(response.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  // Handle Change=============

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Delete

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "Demo", id);
      await deleteDoc(docRef);
      alert("Delete Successfully");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Update

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "Demo",editID);
      await updateDoc(docRef, {
        Name: formValue.Name,
        fatherName: formValue.fatherName,
      });
      alert("Update Successfully");
      fetchData()
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item,id) => {
    setEditID(id)
    setFormValue({
      Name: item.Name,
      fatherName: item.fatherName,
    });
    setShow(true);
  };

  // useEffect===========

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div action="">
        <input
          type="text"
          value={formValue.Name}
          placeholder="Enter Your Name"
          name="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={formValue.fatherName}
          placeholder="Enter Your Father Name"
          name="fatherName"
          onChange={handleChange}
        />
        {show ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={handleSubmit}>Create</button>
        )}
        <div>
          {fetch.map((item, index) => (
            <div key={index}>
              <div> {item.Name}</div>
              <div> {item.Name}</div>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              <button onClick={() => handleEdit(item,item.id)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
