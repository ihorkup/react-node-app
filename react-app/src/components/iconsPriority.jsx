import React from "react";
import highest from "./../images/priority/red.png";
import high from "./../images/priority/lightred.png";
import medium from "./../images/priority/orange.png";
import low from "./../images/priority/green.png";
import lowest from "./../images/priority/lightgreen.png";

const IconsPriority = () => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <img width="18px" src={highest} alt="highest" />
          </td>
          <td>
            <img width="18px" src={high} alt="high" />
          </td>
          <td>
            <img width="18px" src={medium} alt="medium" />
          </td>
          <td>
            <img width="18px" src={low} alt="low" />
          </td>
          <td>
            <img width="18px" src={lowest} alt="lowest" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default IconsPriority;
