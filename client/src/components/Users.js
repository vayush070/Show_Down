import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = (props) => {
  const [allUsers, setallUsers] = useState([]);
  useEffect(() => {
    const getusers = async () => {
      try {
        const res = await axios.get("/api/getuser");
        if (res.status === 200) {
          console.log("loaded successfully");
          // console.log(res);
          setallUsers(res.data);
        }
      } catch (error) {
        console.log("error here");
        // console.log("fman");
      }
    };
    getusers();
  }, []);

  return (
    <div>
      <button onClick={() => props.onAdd()}>Go back</button>
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
