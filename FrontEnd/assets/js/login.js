// async function login() {
const loginForm = document.getElementById("loginform");
loginForm.addEventListener("submit", function (event) {
  console.log("clic bouton envoi");
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loginValues = {
    email,
    password,
  };

  console.log("email = " + email);
  console.log("password =" + password);

  const chargeUtile = JSON.stringify(loginValues);

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: chargeUtile,
  });
});
// }
