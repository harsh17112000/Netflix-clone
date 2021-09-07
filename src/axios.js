import axios from "axios";

// base url make  requeste to the  movies database
const instance = axios.create({
    baseURL:"http://api.themoviedb.org/3"
});



export default instance;

// for understandign
// instance.get("/foo-bar");

// // "http://api.themoviedb.org/3/foo-bar"