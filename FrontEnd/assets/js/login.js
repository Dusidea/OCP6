// import { fetchCategories, displayCategories } from "./category_filter.js";

// import {} from "./modal.js";

function redirect() {
  let url = "./index.html";
  location.href = url;
}

async function login() {
  const loginForm = document.getElementById("loginform");
  // const loginForm = document.querySelector(".loginformclass");
  console.log(
    "tentative de récupérer le formulaire de login id loginform " + loginForm
  );

  loginForm.addEventListener("submit", async function (event) {
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

    const authResponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: chargeUtile,
    });
    if (email != "sophie.bluel@test.tld" || password != "S0phie") {
      document.getElementById("logerror").classList.remove("hidden");
      console.log("pb identifiant");
    } else {
      const data = await authResponse.json();
      const token = data.token;
      //local storage : F12, application, local storage.
      sessionStorage.setItem("myToken", token);
      console.log("token = " + token);

      redirect();
    }
  });
}

login();
// fetchCategories();
// displayCategories(categories);
