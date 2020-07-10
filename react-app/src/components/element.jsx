import React from "react";

const Element = ({
  arraySource,
  arraySave1,
  arraySave2,
  arraySave3,
  arraySave4,
}) => {
  arraySource &&
    arraySource.map(
      (item) => item.fields.issuetype.name === "Bug" && arraySave1.push(item)
    );
  arraySource.map(
    (item) => item.fields.issuetype.name === "Task" && arraySave2.push(item)
  );
  arraySource.map(
    (item) => item.fields.issuetype.name === "Story" && arraySave3.push(item)
  );
  arraySource.map(
    (item) => item.fields.issuetype.name === "Epic" && arraySave4.push(item)
  );

  return;
};

export default Element;
