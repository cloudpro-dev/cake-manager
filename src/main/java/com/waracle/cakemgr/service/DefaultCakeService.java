package com.waracle.cakemgr.service;

import com.waracle.cakemgr.repository.CakeEntity;
import com.waracle.cakemgr.repository.CakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

/**
 * Default implementation of the CakeService
 *
 * @author Gavin Martin
 */
@Service
public class DefaultCakeService implements CakeService {

    private final CakeRepository repository;

    @Autowired
    public DefaultCakeService(CakeRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<CakeEntity> findById(long id) {
        return repository.findById(id);
    }

    @Override
    public CakeEntity save(CakeEntity cake) {
        Objects.requireNonNull(cake);
        return repository.save(cake);
    }

    @Override
    public Iterable<CakeEntity> findAll() {
        return repository.findAll();
    }
}
