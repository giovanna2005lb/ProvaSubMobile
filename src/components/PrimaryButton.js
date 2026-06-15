import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function PrimaryButton({ title, onPress, loading, outline }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        outline
          ? { borderWidth: 1, borderColor: colors.primary, backgroundColor: 'transparent' }
          : { backgroundColor: colors.primary },
      ]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={outline ? colors.primary : '#FFF'} />
      ) : (
        <Text style={[styles.text, { color: outline ? colors.primary : '#FFF' }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
