class User {
  constructor(_name) {
    this.name = _name;
  }

  createCard() {
    const card = document.createElement("div");
    card.classList.add("card", "m-3");
    card.style.width = "200px";
    card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
        </div>
      `;
    return card;
  }
}

let listNames = JSON.parse(localStorage.getItem("names")) || [];
const cardContainer = document.getElementById("cardContainer");

// Funzione per visualizzare tutte le card salvate
function displayCards() {
  cardContainer.innerHTML = "";
  listNames.forEach((user) => {
    cardContainer.appendChild(new User(user.name).createCard());
  });
}

document.getElementById("nameForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;

  const newUser = new User(name);
  listNames.push(newUser);
  localStorage.setItem("names", JSON.stringify(listNames));
  cardContainer.appendChild(newUser.createCard());
});

document.getElementById("Delete").addEventListener("click", function () {
  if (listNames.length > 0) {
    listNames.pop();
    localStorage.setItem("names", JSON.stringify(listNames));
    cardContainer.removeChild(cardContainer.lastChild);
  }
});

// Visualizza le card all'avvio della pagina
displayCards();
