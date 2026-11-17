package com.senai.karina.ong.api.service;

import com.senai.karina.ong.api.config.PontoNaoEncontradoException;
import com.senai.karina.ong.api.dto.PontoRequestDTO;
import com.senai.karina.ong.api.dto.PontoResponseDTO;
import com.senai.karina.ong.api.entity.Ponto;
import com.senai.karina.ong.api.repository.PontoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PontoService {

    private final PontoRepository repository;

    public List<PontoResponseDTO> listar() {
        return repository.findAll().stream()
                .map(PontoResponseDTO::toDto)
                .toList();
    }

    public PontoResponseDTO buscarPorId(UUID id) {
        return PontoResponseDTO.toDto(buscarEntidade(id));
    }

    public PontoResponseDTO criar(PontoRequestDTO dto) {
        Ponto salvo = repository.save(Ponto.toEntity(dto));
        return PontoResponseDTO.toDto(salvo);
    }

    public PontoResponseDTO atualizar(UUID id, PontoRequestDTO dto) {
        Ponto ponto = buscarEntidade(id);
        ponto.atualizarDados(dto);
        return PontoResponseDTO.toDto(repository.save(ponto));
    }

    public void deletar(UUID id) {
        repository.delete(buscarEntidade(id));
    }

    private Ponto buscarEntidade(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new PontoNaoEncontradoException(id));
    }

    @Transactional(readOnly = true)
    public Page<PontoResponseDTO> buscar(String filtro, Pageable pageable) {
        String f = filtro == null ? "" : filtro.trim();
        return repository.buscar(f, pageable).map(PontoResponseDTO::toDto);
    }
}