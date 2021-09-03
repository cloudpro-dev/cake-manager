package com.waracle.cakemgr.repository;

import com.waracle.cakemgr.domain.CakeDto;

/**
 * Static fixtures used for unit testing
 *
 * @author Gavin Martin
 */
public class CakeFixtures {

    /*
     * JPA objects
     */

    public static CakeEntity blueberryCheesecake() {
        CakeEntity cake = new CakeEntity();
        cake.setId(1L);
        cake.setTitle("Blueberry Cheesecake");
        cake.setDescription("Test description");
        cake.setImageUrl("http://localhost:8080/images/1");
        cake.setCreatedBy("Test user");
        return cake;
    }

    public static CakeEntity mangoCheesecake() {
        CakeEntity cake = new CakeEntity();
        cake.setId(2L);
        cake.setTitle("Mango cheesecake");
        cake.setDescription("Test description");
        cake.setImageUrl("http://localhost:8080/images/2");
        cake.setCreatedBy("Test user");
        return cake;
    }

    /*
     * DTO objects
     */

    public static CakeDto kiwiCheesecake() {
        return new CakeDto(3L, "Kiwi cheesecake", "Test description", "http://localhost:8080/images/1");
    }

    public static CakeDto passionFruitCheesecake() {
        return new CakeDto(4L, "Passion fruit cheesecake", "Test description", "http://localhost:8080/images/2");
    }

}
