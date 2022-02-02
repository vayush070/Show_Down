import React, { useState } from "react";
import "./App.css";
import AddUser from "./components/AddUser";
import Users from "./components/Users";

function App() {
  const [page_toggle, setpage_toggle] = useState(0);
  const changePage = () => {
    const setP = page_toggle === 0 ? 1 : 0;
    setpage_toggle(setP);
  };
  return (
    <div className="App">
      {!page_toggle ? (
        <AddUser onAdd={changePage} />
      ) : (
        <Users onAdd={changePage} />
      )}
      {/* <Users onAdd={changePage} /> */}
    </div>
  );
}

export default App;
