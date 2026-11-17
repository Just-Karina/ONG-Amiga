package com.senai.karina.ong.api.config;

import java.util.UUID;

public class PontoNaoEncontradoException extends RuntimeException {
    public PontoNaoEncontradoException(UUID id) {
        super("Ponto não encontrado: " + id);
    }
}