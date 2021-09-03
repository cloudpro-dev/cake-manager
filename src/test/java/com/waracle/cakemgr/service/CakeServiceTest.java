package com.waracle.cakemgr.service;

import com.waracle.cakemgr.repository.CakeEntity;
import com.waracle.cakemgr.repository.CakeFixtures;
import com.waracle.cakemgr.repository.CakeRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

/**
 * Tests for the Cake service
 *
 * @author Gavin Martin
 */
@SpringBootTest
public class CakeServiceTest {

    @MockBean
    private CakeRepository cakeRepository;

    @Autowired
    private CakeService cakeService;

    @Test
    @DisplayName("findById success")
    public void givenValidId_whenFindById_thenCakeFound() {
        // fixture
        CakeEntity fixture = CakeFixtures.blueberryCheesecake();
        // setup repository to return fixture
        when(cakeRepository.findById(any(Long.class))).thenReturn(Optional.of(fixture));

        // call service and get fixture returned
        CakeEntity cake = cakeService.findById(1L).orElseThrow(() -> new RuntimeException("Cannot find Cake"));
        // assert fixture was returned
        assertThat(fixture, equalTo(cake));
        // verify repository was correct utilised
        verify(cakeRepository, times(1)).findById(any(Long.class));
    }

    @Test
    @DisplayName("findAll success")
    public void whenFindAll_thenCakesFound() {
        CakeEntity fixture1 = CakeFixtures.blueberryCheesecake();
        CakeEntity fixture2 = CakeFixtures.mangoCheesecake();
        List<CakeEntity> fixtures = Arrays.asList(fixture1, fixture2);

        // setup repository to return 2 cakes
        when(cakeRepository.findAll()).thenReturn(fixtures);

        // call service and get fixtures returned
        Iterable<CakeEntity> cakes = cakeService.findAll();
        // assert cakes were returned
        assertThat(cakes, equalTo(fixtures));

        // verify repository was correct utilised
        verify(cakeRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("save failure")
    public void givenNullCake_whenSave_thenThrowError() {
        Exception exception = assertThrows(NullPointerException.class, () -> {
            // null arguments not allowed
            cakeService.save(null);
        });
    }

    @Test
    @DisplayName("save success")
    public void givenValidCake_whenSave_thenSuccess() {
        CakeEntity fixture = CakeFixtures.blueberryCheesecake();
        when(cakeRepository.save(any(CakeEntity.class))).thenReturn(fixture);

        // call the service to save the cake
        CakeEntity resp = cakeService.save(fixture);
        // assert fixture was returned
        assertThat(resp, equalTo(fixture));

        // verify repository was correct utilised
        verify(cakeRepository, times(1)).save(any(CakeEntity.class));
    }
}
