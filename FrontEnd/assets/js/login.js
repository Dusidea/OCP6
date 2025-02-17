function redirect() {
  let url = "./index.html";
  location.href = url;
}

async function login() {
  const loginForm = document.getElementById("loginform");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginValues = {
      email,
      password,
    };
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

      redirect();
    }
  });
}

login();
