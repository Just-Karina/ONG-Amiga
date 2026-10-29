import { DIAS_SEMANA, Ponto, TIPOS_DOACAO } from "../types";

export const pontosMock: Ponto[] = [
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