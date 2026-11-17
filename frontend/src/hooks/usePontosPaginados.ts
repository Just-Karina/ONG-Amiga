import { useCallback, useEffect, useRef, useState } from "react";
import { descreverErro } from "../services/api";
import { buscarPagina } from "../services/pontosService";
import { Ponto } from "../types";

const ATRASO_BUSCA_MS = 400;

export function usePontosPaginados(texto: string) {
  const [filtro, setFiltro] = useState(texto.trim());
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [carregandoInicial, setCarregandoInicial] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState("");

  const proximaPagina = useRef(0);
  const ultimaPagina = useRef(false);
  const emAndamento = useRef(false);
  const buscaAtual = useRef(0);

 
  useEffect(() => {
    const timer = setTimeout(() => setFiltro(texto.trim()), ATRASO_BUSCA_MS);
    return () => clearTimeout(timer);
  }, [texto]);

  const carregar = useCallback(
    async (pagina: number) => {
      if (emAndamento.current) return;
      if (pagina > 0 && ultimaPagina.current) return;

      const busca = buscaAtual.current;
      emAndamento.current = true;
      setErro("");
      if (pagina === 0) {
        setCarregandoInicial(true);
      } else {
        setCarregandoMais(true);
      }

      try {
        const resposta = await buscarPagina(pagina, filtro);
        if (busca !== buscaAtual.current) return;

        setPontos((atual) =>
          pagina === 0 ? resposta.content : [...atual, ...resposta.content],
        );
        proximaPagina.current = pagina + 1;
        ultimaPagina.current =
          resposta.page.number + 1 >= resposta.page.totalPages;
      } catch (e) {
        if (busca !== buscaAtual.current) return;
        setErro(descreverErro(e));
      } finally {
        if (busca === buscaAtual.current) {
          emAndamento.current = false;
          setCarregandoInicial(false);
          setCarregandoMais(false);
        }
      }
    },
    [filtro],
  );


  useEffect(() => {
    buscaAtual.current += 1;
    emAndamento.current = false;
    ultimaPagina.current = false;
    proximaPagina.current = 0;
    setPontos([]);
    carregar(0);
  }, [carregar]);


  const carregarMais = useCallback(() => {
    if (erro || pontos.length === 0) return;
    carregar(proximaPagina.current);
  }, [carregar, erro, pontos.length]);


  const tentarNovamente = useCallback(() => {
    carregar(proximaPagina.current);
  }, [carregar]);

  return {
    pontos,
    carregandoInicial,
    carregandoMais,
    erro,
    carregarMais,
    tentarNovamente,
  };
}