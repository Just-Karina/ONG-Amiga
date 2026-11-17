import { Ponto, PontoRequest } from "../types";
import { del, get, PaginaResponse, post, put } from "./api";

export const TAMANHO_PAGINA = 10;

export function listarPontos(): Promise<Ponto[]> {
  return get<Ponto[]>("/pontos");
}

export function buscarPagina(
  pagina: number,
  filtro: string = "",
  tamanho: number = TAMANHO_PAGINA,
): Promise<PaginaResponse<Ponto>> {
  const f = encodeURIComponent(filtro);
  return get<PaginaResponse<Ponto>>(
    `/pontos/filtro?filtro=${f}&page=${pagina}&size=${tamanho}`,
  );
}

export function buscarPorId(id: string): Promise<Ponto> {
  return get<Ponto>(`/pontos/${id}`);
}

export function cadastrarPonto(ponto: PontoRequest): Promise<Ponto> {
  return post<Ponto>("/pontos", ponto);
}

export function editarPonto(id: string, ponto: PontoRequest): Promise<Ponto> {
  return put<Ponto>(`/pontos/${id}`, ponto);
}

export function excluirPonto(id: string): Promise<void> {
  return del(`/pontos/${id}`);
}