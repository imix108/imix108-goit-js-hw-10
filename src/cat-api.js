import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_SLKvQuh0YoSCODLq65zIyzqM1TRW5n01eH9WxzbYHQMcNVlg4QOMQCWr5Azf8kwJ';

export function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
