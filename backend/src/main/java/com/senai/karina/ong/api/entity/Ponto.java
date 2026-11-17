package com.senai.karina.ong.api.entity;

import com.senai.karina.ong.api.dto.PontoRequestDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "TB_PONTO")
public class Ponto {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String horario;

    @Column(nullable = false)
    private String tipo;


    public Ponto(String nome, String endereco, String bairro, String horario, String tipo) {
        this.nome = nome;
        this.endereco = endereco;
        this.bairro = bairro;
        this.horario = horario;
        this.tipo = tipo;
    }

    // ToEntity (não sei explicar ainda)
    public static Ponto toEntity(PontoRequestDTO dto) {
        return new Ponto(dto.nome(), dto.endereco(), dto.bairro(), dto.horario(), dto.tipo());
    }

    // Pro metodo Put
    public void atualizarDados(PontoRequestDTO dto) {
        this.nome = dto.nome();
        this.endereco = dto.endereco();
        this.bairro = dto.bairro();
        this.horario = dto.horario();
        this.tipo = dto.tipo();
    }
}