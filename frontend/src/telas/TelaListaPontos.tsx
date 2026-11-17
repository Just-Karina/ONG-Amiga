import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { ItemDoacao, Ponto, RootStackParamList, TIPOS_DOACAO } from "../types";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect, useMemo, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  atualizarDoacao,
  listarDoacoes,
  salvarDoacao,
} from "../dados/doacoesStorage";
import { styles } from "../utils/styling";
import { usePontosPaginados } from "../hooks/usePontosPaginados";

type Props = NativeStackScreenProps<RootStackParamList, "TelaListaPontos">;

function PontoItem({ ponto, onPress }: { ponto: Ponto; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.pontoItem}>
      <Text style={styles.pontoNome}>{ponto.nome}</Text>
      <Text style={styles.pontoEndereco}>{ponto.endereco}</Text>
      <Text style={styles.pontoEndereco}>{ponto.bairro}</Text>
    </Pressable>
  );
}

function MensagemErro({
  mensagem,
  onTentarNovamente,
}: {
  mensagem: string;
  onTentarNovamente: () => void;
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.textErro, { textAlign: "center" }]}>{mensagem}</Text>
      <Pressable style={styles.button} onPress={onTentarNovamente}>
        <Text style={styles.buttonText}>Tentar novamente</Text>
      </Pressable>
    </View>
  );
}

export default function TelaListaPontos({ navigation, route }: Props) {
  const doacaoId = route.params?.doacaoId;
  const editando = doacaoId !== undefined;
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [pontoSelecionado, setPontoSelecionado] = useState<Ponto | null>(null);
  const [tipo, setTipo] = useState<TIPOS_DOACAO>(TIPOS_DOACAO.ALIMENTOS);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [textoBusca, setTextoBusca] = useState("");
  const insets = useSafeAreaInsets();

  const {
    pontos,
    carregandoInicial,
    carregandoMais,
    erro: erroPontos,
    carregarMais,
    tentarNovamente,
  } = usePontosPaginados(textoBusca);

  const opcoesPonto = useMemo(() => {
    if (pontoSelecionado && !pontos.some((p) => p.id === pontoSelecionado.id)) {
      return [pontoSelecionado, ...pontos];
    }
    return pontos;
  }, [pontos, pontoSelecionado]);

  useEffect(() => {
    navigation.setOptions({
      title: editando ? "Editar doação" : "Pontos de coleta",
    });
  }, [editando, navigation]);

  useEffect(() => {
    if (!editando && pontoSelecionado === null && pontos.length > 0) {
      setPontoSelecionado(pontos[0]);
    }
  }, [editando, pontoSelecionado, pontos]);

  useEffect(() => {
    if (doacaoId === undefined) {
      return;
    }

    listarDoacoes()
      .then((doacoes) => {
        const doacao = doacoes.find((item) => item.id === doacaoId);
        if (!doacao) {
          setErro("Doação não encontrada");
          return;
        }
        setNome(doacao.nome);
        setQuantidade(doacao.quantidade.toString());
        setTipo(doacao.tipo);
        setPontoSelecionado(doacao.pontoDestino);
      })
      .catch((error) => setErro("Erro ao carregar a doação: " + error.message));
  }, [doacaoId]);

  async function validarESalvar() {
    setSucesso("");

    if (!nome || !quantidade || !tipo) {
      setErro("Preencha todos os campos");
      return;
    }

    if (isNaN(Number(quantidade))) {
      setErro("Quantidade deve ser um número");
      return;
    }

    if (pontoSelecionado === null) {
      setErro("Selecione um ponto de doação");
      return;
    }

    const itemDoacao: ItemDoacao = {
      id: doacaoId ?? -1,
      criadoEm: 0 as unknown as Date,
      nome,
      tipo,
      quantidade: Number(quantidade),
      pontoDestino: pontoSelecionado,
    };

    const salvar = editando ? atualizarDoacao : salvarDoacao;

    await salvar(itemDoacao)
      .then(() => {
        setErro("");
        if (editando) {
          navigation.goBack();
          return;
        }
        setSucesso(`${nome} cadastrado com sucesso!`);

        setPontoSelecionado(null);
        setNome("");
        setQuantidade("");
        setTipo(TIPOS_DOACAO.ALIMENTOS);
      })
      .catch((error) => {
        setErro("Erro ao salvar a doação: " + error.message);
      });
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          style={styles.flatList}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          }}
          keyboardShouldPersistTaps="handled"
          data={pontos}
          keyExtractor={(item) => item.id}
          onEndReached={carregarMais}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <PontoItem
                ponto={item}
                onPress={() =>
                  navigation.navigate("TelaDetalhePonto", { pontoId: item.id })
                }
              />
            </View>
          )}
          ListEmptyComponent={
            carregandoInicial ? (
              <ActivityIndicator size="large" style={{ margin: 24 }} />
            ) : erroPontos ? (
              <MensagemErro
                mensagem={erroPontos}
                onTentarNovamente={tentarNovamente}
              />
            ) : (
              <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                  Nenhum ponto encontrado.
                </Text>
              </View>
            )
          }
          ListFooterComponent={
            carregandoMais ? (
              <ActivityIndicator style={{ margin: 16 }} />
            ) : erroPontos && pontos.length > 0 ? (
              <MensagemErro
                mensagem={erroPontos}
                onTentarNovamente={tentarNovamente}
              />
            ) : null
          }
          ListHeaderComponent={
            <View style={styles.container}>
              <Text style={styles.title}>
                {editando
                  ? "Edição de item de doação"
                  : "Cadastro de item de doação"}
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Quantidade"
                keyboardType="numeric"
                value={quantidade}
                onChangeText={setQuantidade}
              />
              <Text>Selecione o tipo de doação:</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={tipo} onValueChange={setTipo}>
                  {Object.values(TIPOS_DOACAO).map((tipo) => (
                    <Picker.Item key={tipo} label={tipo} value={tipo} />
                  ))}
                </Picker>
              </View>
              <Text>Selecione o ponto de doação:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={pontoSelecionado?.id ?? ""}
                  onValueChange={(id) =>
                    setPontoSelecionado(
                      opcoesPonto.find((ponto) => ponto.id === id) ?? null,
                    )
                  }
                >
                  {opcoesPonto.map((ponto) => (
                    <Picker.Item
                      key={ponto.id}
                      label={ponto.nome}
                      value={ponto.id}
                    />
                  ))}
                </Picker>
              </View>

              <Pressable style={styles.button} onPress={validarESalvar}>
                <Text style={styles.buttonText}>
                  {editando ? "Salvar alterações" : "Cadastrar"}
                </Text>
              </Pressable>

              <Pressable
                style={[styles.button, { backgroundColor: "#b4dd1e" }]}
                onPress={() =>
                  editando
                    ? navigation.goBack()
                    : navigation.navigate("TelaMinhasDoacoes")
                }
              >
                <Text style={styles.buttonText}>
                  {editando ? "Cancelar" : "Minhas Doações"}
                </Text>
              </Pressable>

              <View>
                {sucesso ? (
                  <Text style={styles.textSucesso}>{sucesso}</Text>
                ) : null}
                {erro ? <Text style={styles.textErro}>{erro}</Text> : null}
              </View>

              <Text style={styles.title}>Pontos de coleta</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Buscar por nome ou bairro"
                value={textoBusca}
                onChangeText={setTextoBusca}
                autoCorrect={false}
                returnKeyType="search"
              />
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}