import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/table";
import Filter from "./components/filter";

function App() {
  const [filters, setFilters] = useState([]);
  const [ArrayActiveUsers, setActiveUsers] = useState([]);
  const [selectFilter, setSelectFilter] = useState("default filter");

  useEffect(() => {
    fetch("https://node-app-jira-kupr4ty1.herokuapp.com/filters")
      .then((response) => response.json())
      .then((res) => {
        if (res && res) {
          setFilters(res);
        }
      })
      .catch((err) => console.log("error: ", err));
    fetch("https://node-app-jira-kupr4ty1.herokuapp.com/activeUsers")
      .then((response) => response.json())
      .then((res) => {
        if (res && res) {
          setActiveUsers(res);
        }
      })
      .catch(() => console.log("error"));
  }, []);

  return (
    <div className="mainContainer">
      <h2>App by Ihor Kupratyi &copy; 2020</h2>
      {filters.length === 0 || ArrayActiveUsers.length === 0 ? (
        <div id="loadingMain">Loading... Please wait</div>
      ) : (
        <>
          <Filter {...{ filters, setSelectFilter }} />
          <Table {...{ filters, selectFilter, ArrayActiveUsers }} />
        </>
      )}
    </div>
  );
}

export default App;
