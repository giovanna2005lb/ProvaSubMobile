export const API_KEY = 'COLOCAR_API_KEY';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// GET 
// Aqui vai pegar a lista de filmes populares ó
export async function fetchPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Erro ao buscar filmes populares');
  }
  const data = await response.json();
  return data.results;
}

// GET 
// Aqui é pra procurar algum filme em ESPECIFICO
export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(
      query
    )}`
  );
  if (!response.ok) {
    throw new Error('Erro ao buscar filmes');
  }
  const data = await response.json();
  return data.results;
}

// GET
// Aqui ele vai pegar detalhes do filme especifico
export async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`
  );
  if (!response.ok) {
    throw new Error('Erro ao buscar detalhes do filme');
  }
  const data = await response.json();
  return data;
}
