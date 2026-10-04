import axios from "axios";
const API_URL = import.meta.env.VITE_RECIPE_API_URL;

const recipeApi = axios.create({
  baseURL: API_URL,
});

export default recipeApi;
