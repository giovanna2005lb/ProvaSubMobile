import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MovieCard from '../components/MovieCard';
import PrimaryButton from '../components/PrimaryButton';
import { getFavorites, removeFavorite, clearFavorites } from '../services/favoritesStorage';
import { useTheme } from '../contexts/ThemeContext';

export default function Favoritos({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  async function loadFavorites() {
    const data = await getFavorites();
    setFavorites(data);
  }

  async function handleRemove(movieId) {
    const updated = await removeFavorite(movieId);
    setFavorites(updated);
  }

  function handleClearAll() {
    if (favorites.length === 0) return;

    Alert.alert(
      'Limpar favoritos',
      'Tem certeza que deseja remover todos os filmes favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            const updated = await clearFavorites();
            setFavorites(updated);
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Meus Favoritos</Text>
        <Text style={[styles.headerSubtitle, { color: colors.subtext }]}>
          {favorites.length} {favorites.length === 1 ? 'filme salvo' : 'filmes salvos'}
        </Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View>
            <MovieCard
              movie={item}
              onPress={() => navigation.navigate('Detalhes', { movieId: item.id })}
            />
            <PrimaryButton
              title="Remover"
              outline
              onPress={() => handleRemove(item.id)}
            />
            <View style={{ height: 12 }} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.subtext }]}>
            Você ainda não tem filmes favoritos.{'\n'}
            Vá até a aba Filmes e adicione alguns!
          </Text>
        }
      />

      {favorites.length > 0 && (
        <View style={styles.footer}>
          <PrimaryButton title="Limpar todos os favoritos" onPress={handleClearAll} outline />
        </View>
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
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  empty: {
    textAlign: 'center',
    marginTop: 60,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
