import React from "react";
import IconsType from "./iconsType";

const RowsForTable = ({
  ArrayActiveUsers,
  i,
  issuesData,
  numberOfRows,
  filterStatus,
  selectFilter,
  filters,
}) => {
  let urlForLink;
  if (filterStatus) {
    urlForLink = selectFilter.viewUrl;
  } else {
    urlForLink = `https://kupr4ty1.atlassian.net/browse/SAAS-17?filter=${
      filters && filters[0].id
    }`;
  }

  let nameOfUser;
  let userId;
  if (numberOfRows === 1) {
    nameOfUser = issuesData[0].fields.assignee.displayName;
    userId = issuesData[0].fields.assignee.accountId;
  } else {
    nameOfUser = ArrayActiveUsers[i].displayName;
    userId = ArrayActiveUsers[i].accountId;
  }

  const filterElementsByStatus = (source, storage, status) => {
    if (source) {
      source.map(
        (item) => item.fields.status.name === `${status}` && storage.push(item)
      );
    }
    return;
  };

  const filterElementsByType = (
    arraySource,
    arraySave1,
    arraySave2,
    arraySave3,
    arraySave4
  ) => {
    if (arraySource) {
      arraySource.map(
        (item) => item.fields.issuetype.name === "Bug" && arraySave1.push(item)
      );
      arraySource.map(
        (item) => item.fields.issuetype.name === "Task" && arraySave2.push(item)
      );
      arraySource.map(
        (item) =>
          item.fields.issuetype.name === "Story" && arraySave3.push(item)
      );
      arraySource.map(
        (item) => item.fields.issuetype.name === "Epic" && arraySave4.push(item)
      );
    }

    return;
  };
  const filterElementByPriority = (source, priority) => {
    let highest = [];
    let high = [];
    let medium = [];
    let low = [];
    let lowest = [];
    source &&
      source.map(
        (el) => el.fields.priority.name === "Highest" && highest.push(el)
      );
    source &&
      source.map((el) => el.fields.priority.name === "High" && high.push(el));
    source &&
      source.map(
        (el) => el.fields.priority.name === "Medium" && medium.push(el)
      );
    source &&
      source.map((el) => el.fields.priority.name === "Low" && low.push(el));
    source &&
      source.map(
        (el) => el.fields.priority.name === "Lowest" && lowest.push(el)
      );
    if (priority === "highest" && highest.length > 0) {
      return highest;
    } else if (priority === "high" && high.length > 0) {
      return high;
    } else if (priority === "medium" && medium.length > 0) {
      return medium;
    } else if (priority === "low" && low.length > 0) {
      return low;
    } else if (priority === "lowest" && lowest.length > 0) {
      return lowest;
    } else {
      return 0;
    }
  };

  let numberOfBacklog = [];
  let numberOfBacklogBug = [];
  let numberOfBacklogTask = [];
  let numberOfBacklogStory = [];
  let numberOfBacklogEpic = [];
  let numberOfForDev = [];
  let numberOfForDevBug = [];
  let numberOfForDevTask = [];
  let numberOfForDevStory = [];
  let numberOfForDevEpic = [];
  let numberOfInProgress = [];
  let numberOfInProgressBug = [];
  let numberOfInProgressTask = [];
  let numberOfInProgressStory = [];
  let numberOfInProgressEpic = [];
  let numberOfDone = [];
  let numberOfDoneBug = [];
  let numberOfDoneTask = [];
  let numberOfDoneStory = [];
  let numberOfDoneEpic = [];

  filterElementsByStatus(issuesData, numberOfBacklog, "Backlog");
  filterElementsByStatus(
    issuesData,
    numberOfForDev,
    "Selected for Development"
  );
  filterElementsByStatus(issuesData, numberOfInProgress, "In Progress");
  filterElementsByStatus(issuesData, numberOfDone, "Done");

  filterElementsByType(
    numberOfBacklog,
    numberOfBacklogBug,
    numberOfBacklogTask,
    numberOfBacklogStory,
    numberOfBacklogEpic
  );
  filterElementsByType(
    numberOfForDev,
    numberOfForDevBug,
    numberOfForDevTask,
    numberOfForDevStory,
    numberOfForDevEpic
  );
  filterElementsByType(
    numberOfInProgress,
    numberOfInProgressBug,
    numberOfInProgressTask,
    numberOfInProgressStory,
    numberOfInProgressEpic
  );
  filterElementsByType(
    numberOfDone,
    numberOfDoneBug,
    numberOfDoneTask,
    numberOfDoneStory,
    numberOfDoneEpic
  );

  const getGeneratePath = (status, type, priority) => {
    let path =
      urlForLink +
      `&jql=assignee=${userId} AND status=${status} AND issuetype=${type} AND priority=${priority}`;
    return path;
  };

  const getColorForCell = (createDateOfIssue) => {
    //computing for create date
    let today = new Date();
    today.setDate(today.getDate() - 5);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;

    let resultColor;
    let createDate;
    let dueDateOfIssue;
    let fiveDaysEarlier;
    let a = createDateOfIssue;
    a &&
      a.map((arr) => {
        createDate = arr.fields.created.substr(0, 10);
        createDate = Date.parse(createDate);
        fiveDaysEarlier = Date.parse(today);
        if (fiveDaysEarlier <= createDate) {
          resultColor = "#FFFACD"; //color = yellow
        } else {
          resultColor = "white";
        }

        //computing for due date
        if (resultColor === "white") {
          let threeDaysEarlier = new Date();
          threeDaysEarlier.setDate(threeDaysEarlier.getDate() - 3);
          let dd = String(threeDaysEarlier.getDate()).padStart(2, "0");
          let mm = String(threeDaysEarlier.getMonth() + 1).padStart(2, "0");
          let yyyy = threeDaysEarlier.getFullYear();
          threeDaysEarlier = yyyy + "-" + mm + "-" + dd;

          a &&
            a.map((array) => {
              if (array.fields.duedate !== null) {
                dueDateOfIssue = array.fields.duedate.substr(0, 10);

                dueDateOfIssue = Date.parse(dueDateOfIssue);
                threeDaysEarlier = Date.parse(threeDaysEarlier);
                if (threeDaysEarlier > dueDateOfIssue) {
                  resultColor = "#FFC0CB"; //color = red
                } else {
                  resultColor = "white";
                }
              } else {
                resultColor = "white";
              }
            });
        }
      });
    return resultColor;
  };

  return (
    <>
      <tr className="row">
        <td className="assignee">{nameOfUser}</td>
        <td className="typeIcon">
          <IconsType />
        </td>
        {filterStatus !== "Done" &&
          filterStatus !== "In Progress" &&
          filterStatus !== "Selected for Development" && (
            <td className="data backlog">
              <table>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogBug, "highest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Bug", "Highest")}>
                        {
                          filterElementByPriority(numberOfBacklogBug, "highest")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogBug, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Bug", "High")}>
                        {
                          filterElementByPriority(numberOfBacklogBug, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogBug, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Bug", "Medium")}>
                        {
                          filterElementByPriority(numberOfBacklogBug, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogBug, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Bug", "Low")}>
                        {
                          filterElementByPriority(numberOfBacklogBug, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogBug, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Bug", "Lowest")}>
                        {
                          filterElementByPriority(numberOfBacklogBug, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfBacklogTask,
                            "highest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Task", "Highest")}>
                        {
                          filterElementByPriority(
                            numberOfBacklogTask,
                            "highest"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogTask, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Task", "High")}>
                        {
                          filterElementByPriority(numberOfBacklogTask, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogTask, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Task", "Medium")}>
                        {
                          filterElementByPriority(numberOfBacklogTask, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogTask, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Task", "Low")}>
                        {
                          filterElementByPriority(numberOfBacklogTask, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogTask, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Task", "Lowest")}>
                        {
                          filterElementByPriority(numberOfBacklogTask, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfBacklogStory,
                            "highest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Story", "Highest")}>
                        {
                          filterElementByPriority(
                            numberOfBacklogStory,
                            "highest"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogStory, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Story", "High")}>
                        {
                          filterElementByPriority(numberOfBacklogStory, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfBacklogStory,
                            "medium"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Story", "Medium")}>
                        {
                          filterElementByPriority(
                            numberOfBacklogStory,
                            "medium"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogStory, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Story", "Low")}>
                        {
                          filterElementByPriority(numberOfBacklogStory, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfBacklogStory,
                            "lowest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Story", "Lowest")}>
                        {
                          filterElementByPriority(
                            numberOfBacklogStory,
                            "lowest"
                          ).length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfBacklogEpic,
                            "highest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Epic", "Highest")}>
                        {
                          filterElementByPriority(
                            numberOfBacklogEpic,
                            "highest"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogEpic, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Epic", "High")}>
                        {
                          filterElementByPriority(numberOfBacklogEpic, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogEpic, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Epic", "Medium")}>
                        {
                          filterElementByPriority(numberOfBacklogEpic, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogEpic, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Epic", "Low")}>
                        {
                          filterElementByPriority(numberOfBacklogEpic, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfBacklogEpic, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10000", "Epic", "Lowest")}>
                        {
                          filterElementByPriority(numberOfBacklogEpic, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          )}
        {filterStatus !== "Done" &&
          filterStatus !== "In Progress" &&
          filterStatus !== "Backlog" && (
            <td className="data forDev">
              <table>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevBug, "highest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Bug", "Highest")}>
                        {
                          filterElementByPriority(numberOfForDevBug, "highest")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevBug, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Bug", "High")}>
                        {
                          filterElementByPriority(numberOfForDevBug, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevBug, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Bug", "Medium")}>
                        {
                          filterElementByPriority(numberOfForDevBug, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevBug, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Bug", "Low")}>
                        {
                          filterElementByPriority(numberOfForDevBug, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevBug, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Bug", "Lowest")}>
                        {
                          filterElementByPriority(numberOfForDevBug, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevTask, "highest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Task", "Highest")}>
                        {
                          filterElementByPriority(numberOfForDevTask, "highest")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevTask, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Task", "High")}>
                        {
                          filterElementByPriority(numberOfForDevTask, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevTask, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Task", "Medium")}>
                        {
                          filterElementByPriority(numberOfForDevTask, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevTask, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Task", "Low")}>
                        {
                          filterElementByPriority(numberOfForDevTask, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevTask, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Task", "Lowest")}>
                        {
                          filterElementByPriority(numberOfForDevTask, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfForDevStory,
                            "highest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Story", "Highest")}>
                        {
                          filterElementByPriority(
                            numberOfForDevStory,
                            "highest"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevStory, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Story", "High")}>
                        {
                          filterElementByPriority(numberOfForDevStory, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevStory, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Story", "Medium")}>
                        {
                          filterElementByPriority(numberOfForDevStory, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevStory, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Story", "Low")}>
                        {
                          filterElementByPriority(numberOfForDevStory, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevStory, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Story", "Lowest")}>
                        {
                          filterElementByPriority(numberOfForDevStory, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevEpic, "highest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Epic", "Highest")}>
                        {
                          filterElementByPriority(numberOfForDevEpic, "highest")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevEpic, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Epic", "High")}>
                        {
                          filterElementByPriority(numberOfForDevEpic, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevEpic, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Epic", "Medium")}>
                        {
                          filterElementByPriority(numberOfForDevEpic, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevEpic, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Epic", "Low")}>
                        {
                          filterElementByPriority(numberOfForDevEpic, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfForDevEpic, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10001", "Epic", "Lowest")}>
                        {
                          filterElementByPriority(numberOfForDevEpic, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          )}
        {filterStatus !== "Done" &&
          filterStatus !== "Backlog" &&
          filterStatus !== "Selected for Development" && (
            <td className="data inProgress">
              <table>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressBug,
                            "highest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Bug", "Highest")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressBug,
                            "highest"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfInProgressBug, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Bug", "High")}>
                        {
                          filterElementByPriority(numberOfInProgressBug, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressBug,
                            "medium"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Bug", "Medium")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressBug,
                            "medium"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfInProgressBug, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Bug", "Low")}>
                        {
                          filterElementByPriority(numberOfInProgressBug, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressBug,
                            "lowest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Bug", "Lowest")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressBug,
                            "lowest"
                          ).length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressTask,
                            "highest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Task", "Highest")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressTask,
                            "highest"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressTask,
                            "high"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Task", "High")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressTask,
                            "high"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressTask,
                            "medium"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Task", "Medium")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressTask,
                            "medium"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfInProgressTask, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Task", "Low")}>
                        {
                          filterElementByPriority(numberOfInProgressTask, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressTask,
                            "lowest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Task", "Lowest")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressTask,
                            "lowest"
                          ).length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressStory,
                            "highest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Story", "Highest")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressStory,
                            "highest"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressStory,
                            "high"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Story", "High")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressStory,
                            "high"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressStory,
                            "medium"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Story", "Medium")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressStory,
                            "medium"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressStory,
                            "low"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Story", "Low")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressStory,
                            "low"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressStory,
                            "lowest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Story", "Lowest")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressStory,
                            "lowest"
                          ).length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressEpic,
                            "highest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Epic", "Highest")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressEpic,
                            "highest"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressEpic,
                            "high"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Epic", "High")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressEpic,
                            "high"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressEpic,
                            "medium"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Epic", "Medium")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressEpic,
                            "medium"
                          ).length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfInProgressEpic, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Epic", "Low")}>
                        {
                          filterElementByPriority(numberOfInProgressEpic, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(
                            numberOfInProgressEpic,
                            "lowest"
                          )
                        ),
                      }}
                    >
                      <a href={getGeneratePath("3", "Epic", "Lowest")}>
                        {
                          filterElementByPriority(
                            numberOfInProgressEpic,
                            "lowest"
                          ).length
                        }
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          )}
        {filterStatus !== "In Progress" &&
          filterStatus !== "Backlog" &&
          filterStatus !== "Selected for Development" && (
            <td className="data done">
              <table>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneBug, "highest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Bug", "Highest")}>
                        {
                          filterElementByPriority(numberOfDoneBug, "highest")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneBug, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Bug", "High")}>
                        {
                          filterElementByPriority(numberOfDoneBug, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneBug, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Bug", "Medium")}>
                        {
                          filterElementByPriority(numberOfDoneBug, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneBug, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Bug", "Low")}>
                        {filterElementByPriority(numberOfDoneBug, "low").length}
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneBug, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Bug", "Lowest")}>
                        {
                          filterElementByPriority(numberOfDoneBug, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneTask, "highest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Task", "Highest")}>
                        {
                          filterElementByPriority(numberOfDoneTask, "highest")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneTask, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Task", "High")}>
                        {
                          filterElementByPriority(numberOfDoneTask, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneTask, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Task", "Medium")}>
                        {
                          filterElementByPriority(numberOfDoneTask, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneTask, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Task", "Low")}>
                        {
                          filterElementByPriority(numberOfDoneTask, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneTask, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Task", "Lowest")}>
                        {
                          filterElementByPriority(numberOfDoneTask, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneStory, "highest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Story", "Highest")}>
                        {
                          filterElementByPriority(numberOfDoneStory, "highest")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneStory, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Story", "High")}>
                        {
                          filterElementByPriority(numberOfDoneStory, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneStory, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Story", "Medium")}>
                        {
                          filterElementByPriority(numberOfDoneStory, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneStory, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Story", "Low")}>
                        {
                          filterElementByPriority(numberOfDoneStory, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneStory, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Story", "Lowest")}>
                        {
                          filterElementByPriority(numberOfDoneStory, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneEpic, "highest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Epic", "Highest")}>
                        {
                          filterElementByPriority(numberOfDoneEpic, "highest")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneEpic, "high")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Epic", "High")}>
                        {
                          filterElementByPriority(numberOfDoneEpic, "high")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneEpic, "medium")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Epic", "Medium")}>
                        {
                          filterElementByPriority(numberOfDoneEpic, "medium")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneEpic, "low")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Epic", "Low")}>
                        {
                          filterElementByPriority(numberOfDoneEpic, "low")
                            .length
                        }
                      </a>
                    </td>
                    <td
                      style={{
                        backgroundColor: getColorForCell(
                          filterElementByPriority(numberOfDoneEpic, "lowest")
                        ),
                      }}
                    >
                      <a href={getGeneratePath("10002", "Epic", "Lowest")}>
                        {
                          filterElementByPriority(numberOfDoneEpic, "lowest")
                            .length
                        }
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          )}
      </tr>
    </>
  );
};

export default RowsForTable;
