var express = require("express");
var router = express.Router();
var request = require("request");
const db = require("../connection");
const date = require("../getDate");
const time = require("../getTime");

router.get("/", (req, res) => {
  request("https://kupr4ty1.atlassian.net/rest/api/3/filter", function (
    error,
    response,
    body
  ) {
    let currentDate = date();
    let currentTime = time();
    console.log(currentDate, currentTime);
    let action = "get filters";
    let result = response.statusCode === 200 ? "success" : "fail";
    let sql = `INSERT INTO \`sql2353748\`.\`log\` (\`date\`, \`time\`, \`action\`, \`result\`)
    VALUES ('${currentDate}', '${currentTime}', '${action}', '${result}');`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Add a new log entry");
      }
    });
    if (!error && response.statusCode == 200) {
      let parsedBody = JSON.parse(body);
      res.send(parsedBody);
    }
  });
});

module.exports = router;
