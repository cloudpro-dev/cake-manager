package com.waracle.cakemgr.service;

import com.waracle.cakemgr.repository.CakeEntity;

import java.util.Optional;

/**
 * Provides services interacting with Cake
 *
 * @author Gavin Martin
 */
public interface CakeService {
    /**
     * Find a Cake by its primary identifier
     * @param id the primary identifier
     * @return an Optional which contains the Cake if found
     */
    Optional<CakeEntity> findById(long id);

    /**
     * Save a Cake
     * @param cake the cake details
     * @return the persisted cake
     */
    CakeEntity save(CakeEntity cake);

    /**
     * Read all the Cakes
     * @return a list of Cakes
     */
    Iterable<CakeEntity> findAll();

}
