var axios = require("axios");

(async function fiveSeconds(n) {
  let bearer = "$2y$10$cOjHwJJ/uAEHO1mL0tTeFuzUgpjWUGNsQZo4PCrD/7ixc/aMyOdoe"; // you bearer at https://wafer.nabati.northernlight.id/
  var config = {
    method: "get",
    url: "https://api.nabati.northernlight.id/api/v1/hadiah",
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  };
  await axios(config)
    .then(function (response) {
      console.info(response.response.data);
    })
    .catch(function (error) {
      console.info(error.response.data);
    });
  console.log(n++);
  if (n <= 100000) setTimeout(fiveSeconds, 300, n); // Redo if n <= 5 (and pass n)
})(0);
