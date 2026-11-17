package com.senai.karina.ong.api.entity;

public enum TIPO_PONTO {
    COLETA("coleta"),
    DISTRIBUICAO("distribuição");

    private final String descricao;

    TIPO_PONTO(String descricao){
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
