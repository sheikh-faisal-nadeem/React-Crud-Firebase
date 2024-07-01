import React, { useState } from 'react'


const App = () => {

  const [formValue,setFormValue]=useState({
    Name:"",
    fatherName:""
  })


  const handleSubmit=()=>{
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <div className="App">
    <form action="">
      <div className='bg-red-700'>Faisal</div>
     <input type="text"  value={formValue.Name} placeholder='Enter Your Name' />
     <input type="text"  value={formValue.fatherName} placeholder='Enter Your Father Name' />
     <button onSubmit={handleSubmit}>Create</button>
    </form>

   </div>
  )
}

export default App
