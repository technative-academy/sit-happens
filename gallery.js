/*Dropdown: The code automatically grabs the full list of breeds from the API and drops them into the `<select class="breeds">` menu.
* Breed Labels: The script takes the breed name from the image url
* "More Dogs" Button: adds 9 more dogs to the page
* Filtering: it now filters by dog breed in the drop down 
* Fast Loading: I added `loading="lazy"` to the images, which has fixed the slow loading of images issue

 * Dog Gallery Functionality
 * Uses the Dog CEO API: https://dog.ceo/dog-api/ 
 * which doesnt need an api key 
 */

/*DOM elements*/

const dogGrid = document.getElementById("dogGrid"); //the grid 9 dogs
const breedSelect = document.querySelector(".breeds"); //the dropdown with breeds
const showMoreBtn = document.getElementById("showMoreBtn"); //show more button

/* State management*/
let currentBreed = "all"; //not looking for a specific breed yet

/**
 * Initialize the page as soon as it loads fetch the breeds and the dogs
 */
async function init() {
  await fetchBreeds();
  await fetchDogs();

  // Event Listeners, click a new breed in drop down then it clears out the old ones and fetches the current breed
  breedSelect.addEventListener("change", (e) => {
    currentBreed = e.target.value;
    dogGrid.innerHTML = ""; // Clear grid for new search and fetches dogs for the new breed selected
    fetchDogs();
  });

  showMoreBtn.addEventListener("click", () => {
    //listener for button to get more dogs
    fetchDogs();
  });
}

/**
 * Fetches the list of all breeds from the API to populate the dropdown field
 */
async function fetchBreeds() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breeds = Object.keys(data.message);

    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "all";
    defaultOption.textContent = "All Breeds"; // first option in dropdown
    breedSelect.appendChild(defaultOption);

    // Add breeds from API make an option for each one
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed;
      // Capitalize first letter
      option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching breeds:", error);
  }
}

/**
 * Fetches dog images based on current selection
 */
async function fetchDogs() {
  let url = "https://dog.ceo/api/breeds/image/random/9"; //set to default to get 9 images to fit the design

  if (currentBreed !== "all") {
    url = `https://dog.ceo/api/breed/${currentBreed}/images/random/9`; //adding the current breed to the url to fetch that breed only
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    renderDogCards(data.message);
  } catch (error) {
    console.error("Error fetching dog images:", error);
  }
}

/*rendering*/
/**
 * Renders the dog cards into the HTML grid
 */
function renderDogCards(images) {
  images.forEach((imgUrl) => {
    // Extract breed name from the URL path
    // URL format: .../breeds/beagle/dog.jpg
    const breedName = extractBreedFromUrl(imgUrl);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <img src="${imgUrl}" alt="${breedName}" loading="lazy">
            <div class="card-content" style="padding: 1rem; text-align: center;">
                <h3 style="text-transform: capitalize; font-size: 1.1rem;">${breedName}</h3>
            </div>
        `;
    dogGrid.appendChild(card);
  });
}

/**
 * Helper to get breed name from API image URL
 */
function extractBreedFromUrl(url) {
  const parts = url.split("/");
  const breedIndex = parts.indexOf("breeds") + 1;
  let breed = parts[breedIndex];

  // Handle sub-breeds (e.g., "terrier-border" to "Border Terrier")
  if (breed.includes("-")) {
    const [main, sub] = breed.split("-");
    return `${sub} ${main}`;
  }
  return breed;
}

// Start the app
init();
