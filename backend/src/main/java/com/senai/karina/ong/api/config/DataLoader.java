package com.senai.karina.ong.api.config;

import com.senai.karina.ong.api.entity.Ponto;
import com.senai.karina.ong.api.repository.PontoRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final PontoRepository repository;

    public DataLoader(PontoRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String @NonNull ... args) {
        if (repository.count() > 0) {
            return;
        }

        repository.saveAll(List.of(
                new Ponto("Ponto Central", "Av. Goiás, 100", "Setor Central", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Ponto Bueno", "Av. T-10, 500", "Setor Bueno", "Seg a Sáb, 9h às 18h", "distribuição"),
                new Ponto("Ponto Oeste", "Rua 5, 250", "Setor Oeste", "Seg a Sex, 8h às 16h", "coleta"),
                new Ponto("Ponto Marista", "Av. T-4, 800", "Setor Marista", "Ter a Sáb, 9h às 17h", "distribuição"),
                new Ponto("Ponto Campinas", "Av. Anhanguera, 3000", "Campinas", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Ponto Jardim Goiás", "Av. Jamel Cecílio, 1200", "Jardim Goiás", "Sáb e Dom, 9h às 14h", "distribuição"),
                new Ponto("Ponto Universitário", "Av. Universitária, 1500", "Setor Universitário", "Seg a Sex, 7h às 19h", "coleta"),
                new Ponto("Ponto Vila Nova", "Rua 74, 90", "Vila Nova", "Seg a Sex, 8h às 17h", "distribuição")
        ));
    }
}