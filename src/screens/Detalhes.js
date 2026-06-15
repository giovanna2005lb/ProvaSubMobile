import { useState, useEffect } from 'react';
import {View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { fetchMovieDetails, IMAGE_BASE_URL } from '../services/api';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoritesStorage';
import { useTheme } from '../contexts/ThemeContext';

export default function Detalhes({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    async function loadDetails() {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);

        const favorites = await getFavorites();
        const exists = favorites.find((item) => item.id === data.id);
        setIsFavorite(!!exists);
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível carregar os detalhes do filme.');
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [movieId]);

  async function handleToggleFavorite() {
    if (isFavorite) {
      await removeFavorite(movie.id);
      setIsFavorite(false);
    } else {
      await addFavorite({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
      });
      setIsFavorite(true);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      </SafeAreaView>
    );
  }

  if (!movie) return null;

  const posterUri = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/400x600?text=Sem+Imagem';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: posterUri }} style={styles.poster} />

        <View style={styles.info}>
          <Text style={[styles.title, { color: colors.text }]}>{movie.title}</Text>

          <Text style={[styles.meta, { color: colors.subtext }]}>
            ⭐ {movie.vote_average?.toFixed(1)} • {movie.release_date} •{' '}
            {movie.runtime ? `${movie.runtime} min` : 'N/A'}
          </Text>

          <View style={styles.genres}>
            {movie.genres?.map((genre) => (
              <View key={genre.id} style={[styles.genreTag, { borderColor: colors.primary }]}>
                <Text style={[styles.genreText, { color: colors.primary }]}>{genre.name}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Sinopse</Text>
          <Text style={[styles.overview, { color: colors.subtext }]}>
            {movie.overview || 'Sinopse não disponível.'}
          </Text>

          <PrimaryButton
            title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            onPress={handleToggleFavorite}
            outline={isFavorite}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    paddingBottom: 32,
  },
  poster: {
    width: '100%',
    height: 400,
  },
  info: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    marginBottom: 12,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  genreTag: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
});
