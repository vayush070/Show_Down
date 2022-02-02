import React, { useState } from "react";
import axios from "axios";

const AddUser = (props) => {
  const [formValues, setFormValues] = useState([
    { fullname: "", email: "", username: "" },
  ]);
  const [popup, setpopup] = useState("");

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { fullname: "", email: "", username: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/adduser", formValues, config);
      if (res.status === 200) {
        console.log("User Added");
        setpopup("");
        props.onAdd();
        console.log("here");
      }
    } catch (error) {
      setpopup(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>FullName: </label>
          <input
            type="text"
            name="fullname"
            value={element.fullname || ""}
            onChange={(e) => handleChange(index, e)}
          />
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={element.email || ""}
            onChange={(e) => handleChange(index, e)}
          />
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={element.username || ""}
            onChange={(e) => handleChange(index, e)}
          />
          {index ? (
            <button
              type="button"
              className="button remove"
              onClick={() => removeFormFields(index)}
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
      <div className="button-section">
        <button
          className="button add"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </button>
        <button className="button submit" type="submit">
          Submit
        </button>
      </div>
      <div className="popup">{popup}</div>
    </form>
  );
};

export default AddUser;
