import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DIAS_SEMANA, Ponto, TIPOS_DOACAO } from "../types";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "ListaPontos">;

const pontosMock: Ponto[] = [
  {
    id: 1,
    nome: "Ponto de Doação 1",
    endereco: "Rua Pintado, 90",
    diasQueAtende: [DIAS_SEMANA.SEGUNDA, DIAS_SEMANA.QUARTA],
    tiposDeDoacao: [TIPOS_DOACAO.ALIMENTOS, TIPOS_DOACAO.ROUPAS],
  },
  {
    id: 2,
    nome: "Ponto de Doação 2",
    endereco: "Rua Azul, 233",
    diasQueAtende: [DIAS_SEMANA.QUINTA, DIAS_SEMANA.DOMINGO],
    tiposDeDoacao: [TIPOS_DOACAO.ROUPAS],
  },
  {
    id: 3,
    nome: "Ponto de Doação 3",
    endereco: "Rua Dos Angicos, 21",
    diasQueAtende: [DIAS_SEMANA.SABADO, DIAS_SEMANA.DOMINGO],
    tiposDeDoacao: [TIPOS_DOACAO.ALIMENTOS],
  },
];

function PontoItem({
  ponto,
  onPress,
}: {
  ponto: Ponto;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text>{ponto.nome}</Text>
    </TouchableOpacity>
  );
}

export default function TelaListaPontos({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Pontos de Doação:</Text>
      {pontosMock.map((ponto) => (
        <PontoItem
          key={ponto.id}
          ponto={ponto}
          onPress={() => navigation.navigate("DetalhesPonto", { ponto })}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});