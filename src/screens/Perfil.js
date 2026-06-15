import { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Perfil() {
  const { user, signOut, updateUser } = useAuth();
  const { colors, theme, toggleTheme } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  async function handleOpenCamera() {
    if (!permission?.granted) {
      const response = await requestPermission();
      if (!response.granted) {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de acesso à câmera para definir sua foto de perfil.'
        );
        return;
      }
    }
    setCameraVisible(true);
  }

  async function handleTakePicture() {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      await updateUser({ avatar: photo.uri });
      setCameraVisible(false);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível capturar a foto.');
    }
  }

  function handleLogout() {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: signOut },
    ]);
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.card }]}>
              <Text style={{ fontSize: 40 }}>👤</Text>
            </View>
          )}
        </View>

        <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>

        <PrimaryButton title="Tirar Foto de Perfil" onPress={handleOpenCamera} />

        <View style={{ height: 12 }} />

        <PrimaryButton
          title={theme === 'dark' ? 'Mudar para Tema Claro' : 'Mudar para Tema Escuro'}
          onPress={toggleTheme}
          outline
        />

        <View style={{ height: 12 }} />

        <PrimaryButton title="Sair" onPress={handleLogout} outline />
      </View>

      <Modal visible={cameraVisible} animationType="slide">
        <View style={styles.cameraContainer}>
          <CameraView ref={cameraRef} style={styles.camera} facing="front" />
          <View style={styles.cameraControls}>
            <PrimaryButton title="Capturar" onPress={handleTakePicture} />
            <View style={{ height: 12 }} />
            <PrimaryButton title="Cancelar" outline onPress={() => setCameraVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    padding: 20,
    backgroundColor: '#000',
  },
});
