import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCard from '../components/MovieCard';
import CustomInput from '../components/CustomInput';
import { fetchPopularMovies, searchMovies } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function Home({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const { colors } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    loadPopularMovies();
  }, []);

  async function loadPopularMovies() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPopularMovies();
      setMovies(data);
    } catch (err) {
      setError('Não foi possível carregar os filmes. Verifique sua conexão ou API Key.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(text) {
    setQuery(text);
    if (text.trim().length === 0) {
      loadPopularMovies();
      return;
    }
    try {
      setLoading(true);
      const results = await searchMovies(text);
      setMovies(results);
    } catch (err) {
      setError('Erro ao buscar filmes.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          Olá, {user?.name ?? 'Visitante'} 👋
        </Text>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Filmes Populares</Text>
      </View>

      <View style={styles.searchContainer}>
        <CustomInput
          placeholder="Buscar filme..."
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />
      ) : error ? (
        <Text style={[styles.error, { color: colors.text }]}>{error}</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => navigation.navigate('Detalhes', { movieId: item.id })}
            />
          )}
          ListEmptyComponent={
            <Text style={[styles.empty, { color: colors.subtext }]}>
              Nenhum filme encontrado.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loader: {
    marginTop: 40,
  },
  error: {
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
  },
});
