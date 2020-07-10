const time = () => {
  let today = new Date();
  utc = today.getTime() + today.getTimezoneOffset() * 60000;
  today = new Date(utc + 3600000 * 3); //*(+3) - timezone
  return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
};

module.exports = time;
