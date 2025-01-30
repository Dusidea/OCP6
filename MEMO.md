## Formulaires : récupération de l'envoi

Pour ajouter un event listener au bouton d'envoi d'un formulaire + empecher le rechargement auto de la page sans consigne spécifique

```
async function login() {
const loginForm = document.getElementById([id du form]);
loginForm.addEventListener("submit", function (event) {
console.log("clic bouton envoi");
event.preventDefault();
});
}
```

/!\ Bien respecter la syntaxe qui passe event en fonction sinon event deprecated

## Récupérer un champ du formulaire

```
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
```

Pour construire un objet charge utile à passer à une API :

````
    const loginValues = {
      email: event.target.getElementById("email").value,
      password: event.target.getElementById("password").value,
    };

    ```

    MEH sinon


````

      const loginValues = {
    email,
    password,

};

```
où email et password sont les varaibles récupérées précédemment.

( à placer dans la fonctionn au sein de l'event listener)

### Envoi à l'API avec fetch et les 3 éléments
```

fetch("http://localhost:5678/api/users/login", {
method: "POST",
headers: { "Content-type": "application/json" },
body: chargeUtile,
});

```
où chargeUtile contient un objet au format JSON qui a été constitué comme suit :
```

const chargeUtile = JSON.stringify(loginValues);

```

```
