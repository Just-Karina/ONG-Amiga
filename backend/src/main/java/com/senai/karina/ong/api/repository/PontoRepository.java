package com.senai.karina.ong.api.repository;

import com.senai.karina.ong.api.entity.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PontoRepository extends JpaRepository<Ponto, UUID> {

}