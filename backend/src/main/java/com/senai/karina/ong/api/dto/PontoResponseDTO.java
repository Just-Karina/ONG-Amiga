package com.senai.karina.ong.api.dto;

import com.senai.karina.ong.api.entity.Ponto;

import java.util.UUID;

public record PontoResponseDTO(
        UUID id,
        String nome,
        String endereco,
        String bairro,
        String horario,
        String tipoPonto
) {
   /* public static PontoResponseDTO toDto(Ponto ponto){
        return new PontoResponseDTO(
                ponto.getId();
        );
    }*/
}
