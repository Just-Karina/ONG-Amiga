import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ponto } from './src/types';
import TelaListaPontos from './src/Telas/TelaPontos';
import TelaDetalhesPonto from './src/Telas/TelaDetalhesPonto';

export type RootStackParamList = {
  ListaPontos: undefined;
  DetalhesPonto: { ponto: Ponto };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListaPontos">
          <Stack.Screen
            name="ListaPontos"
            component={TelaListaPontos}
            options={{ title: 'Pontos de Doação' }}
          />
          <Stack.Screen
            name="DetalhesPonto"
            component={TelaDetalhesPonto}
            options={{ title: 'Detalhes do Ponto' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}