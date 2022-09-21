import axios from 'axios';

export default async function fetchImg(searchQuery, page) {
  const URL = 'https://pixabay.com/api/';
  const KEY = '29857828-96e75d784581bc88a50708d5e';
  const PARAMS = `key=${KEY}&q=${searchQuery}&image_type=photo&min_width=800&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  try {
    const response = await axios.get(`${URL}?${PARAMS}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}