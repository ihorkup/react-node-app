import React, { useState, useEffect } from "react";
import IconsPriority from "./iconsPriority";
import RowsForTable from "./RowsForTable";

const Table = ({ filters, selectFilter, ArrayActiveUsers }) => {
  let issuesData = [];
  const [issues, setIssues] = useState([]);
  let Query;
  let numberOfRows = ArrayActiveUsers && ArrayActiveUsers.length;
  let rows = [];
  let filterStatus;
  let isStatus;
  if (selectFilter.jql) {
    filterStatus = selectFilter.jql.split("status = ").pop().split(" ORDER")[0];
    if (filterStatus[0] === '"') {
      filterStatus = filterStatus.slice(1, -1);
    }

    isStatus = selectFilter.jql.indexOf("status") > -1;

    let StrAssignee = selectFilter.jql.split("(").pop().split(")")[0];
    if (StrAssignee.length === 24) {
      numberOfRows = 1;
      issuesData = issues.issues;
    } else {
    }
  } else {
    numberOfRows = ArrayActiveUsers.length;
  }
  if (selectFilter === "default filter") {
    Query = "";
  } else {
    Query = selectFilter.jql;
  }

  for (let i = 0; i < numberOfRows; i++) {
    if (numberOfRows > 1) {
      let IdUser = ArrayActiveUsers && ArrayActiveUsers[i].accountId;
      issues.issues &&
        issues.issues.map(
          (item) =>
            item.fields.assignee.accountId === IdUser && issuesData.push(item)
        );
    }

    rows.push(
      <RowsForTable
        key={ArrayActiveUsers[i].accountId}
        {...{
          ArrayActiveUsers,
          i,
          issuesData,
          numberOfRows,
          filterStatus,
          selectFilter,
          filters,
        }}
      />
    );
    issuesData = [];
  }

  useEffect(() => {
    fetch(`https://node-app-jira-kupr4ty1.herokuapp.com/query?query=${Query}`)
      .then((response) => response.json())
      .then((res) => {
        if (res && res) {
          setIssues(res);
        }
      })
      .catch((err) => console.log("error: ", err));
  }, [selectFilter]);

  return (
    <div>
      <table>
        <tbody>
          <tr className="row">
            <td colSpan="2" className="status"></td>
            {filterStatus !== "Done" &&
              filterStatus !== "In Progress" &&
              filterStatus !== "Selected for Development" && (
                <td className="status">Backlog</td>
              )}
            {filterStatus !== "Done" &&
              filterStatus !== "In Progress" &&
              filterStatus !== "Backlog" && (
                <td className="status">Selected for development</td>
              )}
            {filterStatus !== "Done" &&
              filterStatus !== "Backlog" &&
              filterStatus !== "Selected for Development" && (
                <td className="status">In progress</td>
              )}
            {filterStatus !== "In Progress" &&
              filterStatus !== "Backlog" &&
              filterStatus !== "Selected for Development" && (
                <td className="status">Done</td>
              )}
          </tr>
          <tr className="row">
            <td className="header">Assignee</td>
            <td className="header">Type</td>
            {isStatus ? (
              <td className="priority">
                <IconsPriority />
              </td>
            ) : (
              <>
                <td className="priority">
                  <IconsPriority />
                </td>
                <td className="priority">
                  <IconsPriority />
                </td>
                <td className="priority">
                  <IconsPriority />
                </td>
                <td className="priority">
                  <IconsPriority />
                </td>
              </>
            )}
          </tr>
          {issues.length === 0 ? (
            <tr>
              <td id="loadingTable">Loading... Please wait</td>
            </tr>
          ) : (
            rows
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
