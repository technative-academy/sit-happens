/*Fetch dogs from the dog ceo API, loop over the results
creating a card per dog.  The cards will be populated with an image, name and desription and displayed in a grid of 6 (if I'm copying the design)

At the moment I'm getting all results with no breed data so placeholder text is there instead. This seems to be to do with the API no my code*/

/*line to see if it's working*/
console.log("gallery.js loaded");

const showMoreBtn = document.getElementById("showMoreBtn");

showMoreBtn.addEventListener("click", loadDogs);

const dogGrid = document.getElementById("dogGrid");
let page = 1;

function loadDogs() {
  fetch(`https://api.thedogapi.com/v1/images/search?limit=6&page=${page}`)
    .then((res) => res.json())
    .then((dogs) => {
      dogs.forEach((dog) => {
        const breed = dog.breeds?.[0];

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
  <img class="card__image" src="${dog.url}" alt="Dog image">
  <div class="card__info">
    <h3 class="card__title">${breed?.name || "Lovely dog"}</h3>
    <p class="card__description">
      ${breed?.temperament || "Great dog for families and seaside walks."}
    </p>
  </div>
`;

        dogGrid.appendChild(card);
      });
    })
    .catch((err) => console.error("Dog fetch error:", err));

  page++;
}

loadDogs();
