import { TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function CustomInput({ value, onChangeText, placeholder, ...rest }) {
  const { colors } = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        { backgroundColor: colors.card, color: colors.text, borderColor: colors.border },
      ]}
      placeholder={placeholder}
      placeholderTextColor={colors.subtext}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
});
