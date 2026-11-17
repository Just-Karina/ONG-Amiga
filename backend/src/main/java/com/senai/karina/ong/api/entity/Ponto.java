package com.senai.karina.ong.api.entity;

import com.senai.karina.ong.api.dto.PontoRequestDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
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

    @Column(name = "tipo", nullable = false)
    @Enumerated(EnumType.STRING)
    private TIPO_PONTO tipoPonto;

    public Ponto(){

    }

    public Ponto(String nome, String endereco, String bairro, String horario, TIPO_PONTO tipoPonto){
        this.nome = nome;
        this.endereco = endereco;
        this.bairro = bairro;
        this.horario = horario;
        this.tipoPonto = tipoPonto;
    }

   /* public static Ponto toEntity(PontoRequestDTO pontoRequestDTO){
        Ponto ponto = new Ponto();
        ponto.setMome;
    }*/
}
