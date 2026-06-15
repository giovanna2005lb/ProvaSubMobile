import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IMAGE_BASE_URL } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

export default function MovieCard({ movie, onPress }) {
  const { colors } = useTheme();

  const posterUri = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=Sem+Imagem';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: posterUri }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          ⭐ {movie.vote_average?.toFixed(1) ?? '-'} • {movie.release_date?.slice(0, 4) ?? '----'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: 90,
    height: 130,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
  },
});
