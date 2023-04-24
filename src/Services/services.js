import axios from 'axios';
  
const API_KEY = '34204317-8ae92d59a6bb5fdb3cbc534ec';
const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal`;

axios.defaults.baseURL = URL; 

export const getImages = async (searchQuery, currentPage) => {
  try {
    const response = await axios.get(`&per_page=12&page=${currentPage}&q=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};