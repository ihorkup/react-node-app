const date = () => {
  let today = new Date();
  utc = today.getTime() + today.getTimezoneOffset() * 60000;
  today = new Date(utc + 3600000 * 3); //*(+3) - timezone
  return (
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  );
};

module.exports = date;
