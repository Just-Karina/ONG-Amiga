import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DIAS_SEMANA, Ponto, TIPOS_DOACAO } from "../types";
import { RootStackParamList } from "../../App";
import { useState } from "react";


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
  const [pontos] = useState<Ponto[]>(pontosMock);
  return (
    <View style={styles.container}>
      <Text>Pontos de Doação:</Text>
      <FlatList
        data={pontos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('DetalhesPonto', { ponto: item })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.endereco}>{item.endereco}</Text>
          </TouchableOpacity>
        )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {flex: 1 , padding: 20},
    item: {margin: 10},
    nome: {fontSize: 18, fontWeight: 'bold'},
    endereco: {fontSize: 14},
});