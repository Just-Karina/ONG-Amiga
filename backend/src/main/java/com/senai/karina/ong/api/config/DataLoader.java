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
        List<Ponto> pontos = List.of(
                new Ponto("Ponto Central", "Av. Goiás, 100", "Setor Central", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Ponto Bueno", "Av. T-10, 500", "Setor Bueno", "Seg a Sáb, 9h às 18h", "distribuição"),
                new Ponto("Ponto Oeste", "Rua 5, 250", "Setor Oeste", "Seg a Sex, 8h às 16h", "coleta"),
                new Ponto("Ponto Marista", "Av. T-4, 800", "Setor Marista", "Ter a Sáb, 9h às 17h", "distribuição"),
                new Ponto("Ponto Campinas", "Av. Anhanguera, 3000", "Campinas", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Ponto Jardim Goiás", "Av. Jamel Cecílio, 1200", "Jardim Goiás", "Sáb e Dom, 9h às 14h", "distribuição"),
                new Ponto("Ponto Universitário", "Av. Universitária, 1500", "Setor Universitário", "Seg a Sex, 7h às 19h", "coleta"),
                new Ponto("Ponto Vila Nova", "Rua 74, 90", "Vila Nova", "Seg a Sex, 8h às 17h", "distribuição"),

                new Ponto("Ponto Aeroporto", "Rua 15, 300", "Setor Aeroporto", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Ponto Alto da Glória", "Rua Pires de Campos, 45", "Alto da Glória", "Seg a Sáb, 9h às 17h", "distribuição"),
                new Ponto("Ponto Amazônia", "Av. Rio Verde, 700", "Parque Amazônia", "Seg a Sex, 8h às 16h", "coleta"),
                new Ponto("Ponto Bela Vista", "Av. Bela Vista, 220", "Setor Bela Vista", "Ter a Sáb, 9h às 17h", "distribuição"),
                new Ponto("Ponto Cidade Jardim", "Av. Cidade Jardim, 410", "Cidade Jardim", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Ponto Coimbra", "Av. Perimetral, 1800", "Setor Coimbra", "Seg a Sex, 7h às 18h", "distribuição"),
                new Ponto("Ponto Faiçalville", "Av. Faiçal, 95", "Setor Faiçalville", "Sáb e Dom, 9h às 14h", "coleta"),
                new Ponto("Ponto Funcionários", "Rua 26, 140", "Setor dos Funcionários", "Seg a Sex, 8h às 17h", "distribuição"),
                new Ponto("Ponto Jardim América", "Av. América, 600", "Jardim América", "Seg a Sáb, 8h às 18h", "coleta"),
                new Ponto("Ponto Jardim Atlântico", "Rua do Atlântico, 330", "Jardim Atlântico", "Seg a Sex, 9h às 17h", "distribuição"),
                new Ponto("Ponto Jardim Novo Mundo", "Av. Novo Mundo, 1500", "Jardim Novo Mundo", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Ponto Leste Universitário", "Av. Universitária, 2400", "Setor Leste Universitário", "Seg a Sex, 8h às 18h", "distribuição"),
                new Ponto("Ponto Negrão de Lima", "Rua 88, 75", "Setor Negrão de Lima", "Ter a Sáb, 9h às 16h", "coleta"),
                new Ponto("Ponto Norte Ferroviário", "Av. Contorno, 3500", "Setor Norte Ferroviário", "Seg a Sex, 7h às 16h", "distribuição"),
                new Ponto("Ponto Parque Anhanguera", "Av. Anhanguera, 7000", "Parque Anhanguera", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Ponto Pedro Ludovico", "Av. T-63, 900", "Setor Pedro Ludovico", "Seg a Sáb, 9h às 18h", "distribuição"),
                new Ponto("Ponto Planalto", "Rua Planalto, 120", "Jardim Planalto", "Sáb e Dom, 9h às 13h", "coleta"),
                new Ponto("Ponto Redenção", "Rua 3, 60", "Vila Redenção", "Seg a Sex, 8h às 16h", "distribuição"),
                new Ponto("Ponto Santa Genoveva", "Av. Genoveva, 280", "Setor Santa Genoveva", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto("Ponto Sul", "Rua 115, 450", "Setor Sul", "Seg a Sáb, 8h às 17h", "distribuição"),
                new Ponto("Ponto Vila Brasília", "Rua Brasília, 35", "Vila Brasília", "Ter a Sáb, 9h às 17h", "coleta"),
                new Ponto("Ponto Vila Rosa", "Rua das Rosas, 18", "Vila Rosa", "Seg a Sex, 8h às 17h", "distribuição")
        );

        repository.saveAll(pontos.stream()
                .filter(p -> !repository.existsByNome(p.getNome()))
                .toList());
    }
}