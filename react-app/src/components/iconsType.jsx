import React from "react";
import bug from "./../images/type/bug.png";
import task from "./../images/type/task.png";
import story from "./../images/type/story.png";
import epic from "./../images/type/epic.png";

const IconsType = () => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <div>
              <img width="22px" src={bug} alt="bug" />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <img width="22px" src={task} alt="task" />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <img width="22px" src={story} alt="story" />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <img width="22px" src={epic} alt="epic" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default IconsType;
