package com.senai.karina.ong.api.dto;

import jakarta.validation.constraints.NotBlank;

public record PontoRequestDTO(
        @NotBlank String nome,
        @NotBlank String endereco,
        @NotBlank String bairro,
        @NotBlank String horario,
        @NotBlank String tipoPonto
        ) { }
