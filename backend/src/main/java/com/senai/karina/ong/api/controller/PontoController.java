package com.senai.karina.ong.api.controller;

import com.senai.karina.ong.api.dto.PontoRequestDTO;
import com.senai.karina.ong.api.dto.PontoResponseDTO;
import com.senai.karina.ong.api.service.PontoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/pontos")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Tag(name = "Pontos", description = "Pontos de coleta e distribuição")
public class PontoController {

    private final PontoService service;

    @GetMapping
    public List<PontoResponseDTO> listar() {
        return service.listar();
    }

    @GetMapping("/filtro")
    public Page<PontoResponseDTO> filtrar(
            @RequestParam(required = false) String filtro,
            @ParameterObject @PageableDefault(size = 10, sort = "nome") Pageable pageable) {
        return service.buscar(filtro, pageable);
    }

    @GetMapping("/{id}")
    public PontoResponseDTO buscarPorId(@PathVariable UUID id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PontoResponseDTO criar(@Valid @RequestBody PontoRequestDTO dto) {
        return service.criar(dto);
    }

    @PutMapping("/{id}")
    public PontoResponseDTO atualizar(@PathVariable UUID id, @Valid @RequestBody PontoRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable UUID id) {
        service.deletar(id);
    }
}