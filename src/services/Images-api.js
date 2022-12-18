import axios from 'axios';

const API_KEY = '30883328-4550d73a5a5d91ad50d778095';
// const BASE_URL = 'https://pixabay.com/ai/';
axios.defaults.baseURL = 'https://pixabay.com/api/';

// axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: '12',
};

// export const fetchImages = async (inputSearch, page) => {
//   const url = `?key=${API_KEY}&q=${inputSearch}&page=${page}`;
//   const response = await axios.get(url, {
//     params: {
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//       per_page: '12',
//     },
//   });
//   // console.log(response);
//   return response.data;
// }

export const fetchImages = async (inputSearch, page) => {
  const { data } = await axios.get(
    `?key=${API_KEY}&q=${inputSearch}&page=${page}`
  );
  return data;
};

// export const imagesApiAsync = { apiRings };

// function fetchImages(name, page = 1) {
//   return fetch(
//     'https://pixabay.com/api/?key=30883328-4550d73a5a5d91ad50d778095&q=${name}&page=${page}'
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     return Promise.reject(new Error('error ${nextName}'));
//   });

// }

// export const imagesApi = { fetchImages };
