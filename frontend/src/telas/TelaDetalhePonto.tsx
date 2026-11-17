import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { Ponto, RootStackParamList } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../utils/styling";
import { useEffect, useState } from "react";
import { buscarPorId } from "../services/pontosService";
import { ApiError, descreverErro } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "TelaDetalhePonto">;

function DetalhePonto({ ponto }: { ponto: Ponto }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.pontoNome}>{ponto.nome}</Text>
        <Text style={styles.pontoEndereco}>{ponto.endereco}</Text>
        <Text style={styles.linha}>Bairro: {ponto.bairro}</Text>
        <Text style={styles.linha}>Horário: {ponto.horario}</Text>
        <Text style={styles.linha}>Tipo: {ponto.tipo}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function TelaDetalhePonto({ route }: Props) {
  const { pontoId } = route.params;
  const [ponto, setPonto] = useState<Ponto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    setCarregando(true);
    setErro("");
    setPonto(null);

    buscarPorId(pontoId)
      .then((resposta) => {
        if (ativo) setPonto(resposta);
      })
      .catch((e) => {
        if (!ativo) return;
        const naoEncontrado =
          e instanceof ApiError && (e.status === 404 || e.status === 400);
        setErro(naoEncontrado ? "Ponto não encontrado." : descreverErro(e));
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [pontoId]);

  if (carregando) {
    return (
      <ScrollView style={styles.container}>
        <ActivityIndicator size="large" />
      </ScrollView>
    );
  }

  if (!ponto) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.textErro}>{erro || "Ponto não encontrado."}</Text>
      </ScrollView>
    );
  }

  return <DetalhePonto ponto={ponto} />;
}