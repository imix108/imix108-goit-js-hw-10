import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

loader.style.display = "none";
error.style.display = "none";

fetchBreeds()
  .then((breeds) => {
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch((err) => {
    error.style.display = "block";
    console.error("Error fetching breeds:", err);
  });

breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  loader.style.display = "block";
  error.style.display = "none";
  catInfo.innerHTML = "";

  fetchCatByBreed(selectedBreedId)
    .then((catData) => {
      loader.style.display = "none";
     
      const markup = createMarkup(catData);
      catInfo.innerHTML = markup;
    })
    .catch((err) => {
      loader.style.display = "none";
      error.style.display = "block";
      console.error("Error fetching cat info:", err);
    });
});

function createMarkup(catData) {
  return catData
    .map(
      ({ breeds: [{ name, description, temperament }], url }) => `
      <div style='display: flex; margin-top: 20px' >
        <img style='margin-right: 20px' src=${url} width='300px'>
        <div>
          <h2>${name}</h2>
          <p style='width: 60%'>${description}</p>
          <p style="display: inline"><span style='font-weight: 700'>Temperament:</span> ${temperament}</p>
        </div>
      </div>`
    )
    .join('');
}
