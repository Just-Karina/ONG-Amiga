import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ponto } from "../types";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "DetalhesPonto">;

function DetalhesPonto({ ponto }: { ponto: Ponto }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{ponto.nome}</Text>
      <Text>{ponto.endereco}</Text>
      <Text>Dias que atende: {ponto.diasQueAtende.join(", ")}</Text>
      <Text>Tipos de doação: {ponto.tiposDeDoacao.join(", ")}</Text>
    </View>
  );
}

export default function TelaDetalhesPonto({ route }: Props) {
  const { ponto } = route.params;
  return <DetalhesPonto ponto={ponto} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});