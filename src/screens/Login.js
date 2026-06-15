import { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Login() {
  const [name, setName] = useState('');
  const { signIn } = useAuth();
  const { colors } = useTheme();

  async function handleLogin() {
    if (name.trim().length === 0) {
      Alert.alert('Atenção', 'Digite seu nome para continuar.');
      return;
    }
      await signIn(name.trim());
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.content}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency/96/clapperboard.png' }}
            style={styles.logo}
          />
          <Text style={[styles.title, { color: colors.text }]}>MovieHub</Text>
          <Text style={[styles.subtitle, { color: colors.subtext }]}>
            Descubra, organize e favorite os melhores filmes
          </Text>

          <View style={styles.form}>
            <CustomInput
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            <PrimaryButton title="Entrar" onPress={handleLogin} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    marginTop: 16,
  },
});
