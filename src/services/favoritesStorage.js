import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@moviehub:favorites';

// Read
// Vai puxar os filmes que foram favoritados pelo usuario
export async function getFavorites() {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log('Erro ao ler favoritos:', error);
    return [];
  }
}

// Create
// Adiciona um filme aos favoritos
export async function addFavorite(movie) {
  const favorites = await getFavorites();
  const exists = favorites.find((item) => item.id === movie.id);
  if (exists) return favorites;

  const updated = [...favorites, movie];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

// Delete
// Tira um filme dos seus favoritos
export async function removeFavorite(movieId) {
  const favorites = await getFavorites();
  const updated = favorites.filter((item) => item.id !== movieId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

// Update
// CUIDADO, esse aqui é pra limpar sua lista de favoritos
export async function clearFavorites() {
  await AsyncStorage.removeItem(FAVORITES_KEY);
  return [];
}
