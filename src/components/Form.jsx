import React, { useEffect } from 'react'
import '../App.css'
import { useState } from 'react'
import axios from 'axios'

const Form = () => {
  const [input, setInput] = useState({
    name: '',
    color: '',
  })

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    try {
      const data = await axios.post('http://localhost:8000/api/addcolor', input)
    } catch (error) {
      console.log('error from submit', error)
    }
  }



  return (
    <div className="form">
      <input
        className="form-control"
        type="text"
        name="name"
        placeholder="Enter your name"
        aria-label="default input example"
        value={input.name}
        onChange={handleChange}
      ></input>
      <input
        className="form-control"
        list="datalistOptions"
        name="color"
        id="exampleDataList"
        placeholder="Type to search color..."
        value={input.color}
        onChange={handleChange}
      />
      <datalist id="datalistOptions">
        <option value="Black" />
        <option value="White" />
        <option value="Red" />
        <option value="Blue" />
        <option value="Pink" />
      </datalist>
      <button
        type="button"
        onClick={handleSubmit}
        className="btn btn-primary form-control"
      >
        Sumbit
      </button>
    </div>
  )
}

export default Form
