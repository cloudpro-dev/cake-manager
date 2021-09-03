package com.waracle.cakemgr.repository;

import org.springframework.data.repository.CrudRepository;

/**
 * Custom repository for CRUD operations on Cake entities
 *
 * @author Gavin Martin
 */
public interface CakeRepository extends CrudRepository<CakeEntity, Long> {

}
