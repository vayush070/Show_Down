import React, { useState } from "react";
import axios from "axios";

const Users = (props) => {
  const [allUsers, setallUsers] = useState([]);
  const getusers = async () => {
    try {
      const res = await axios.get("/api/getuser");
      if (res.status === 200) {
        console.log("loaded successfully");
        setallUsers(res.data);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div>
      <button onClick={() => props.onAdd()}>Go back</button>
      <button onClick={getusers}>Get All Users</button>
      <div>
        <table border="2">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">FullName</th>
              <th scope="col">UserName</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={Math.random()}>
                <th scope="col">{user.email}</th>
                <th scope="col">{user.fullname}</th>
                <th scope="col">{user.username}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
