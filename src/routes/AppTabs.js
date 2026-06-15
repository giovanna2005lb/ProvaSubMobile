import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Home from '../screens/Home';
import Favoritos from '../screens/Favoritos';
import Perfil from '../screens/Perfil';
import { useTheme } from '../contexts/ThemeContext';

const Tab = createBottomTabNavigator();

const icons = {
  Filmes: '🎬',
  Favoritos: '⭐',
  Perfil: '👤',
};

export default function AppTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.subtext,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarIcon: () => <Text style={{ fontSize: 20 }}>{icons[route.name]}</Text>,
      })}
    >
      <Tab.Screen name="Filmes" component={Home} />
      <Tab.Screen name="Favoritos" component={Favoritos} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
