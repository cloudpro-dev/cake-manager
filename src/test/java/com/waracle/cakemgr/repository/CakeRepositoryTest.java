package com.waracle.cakemgr.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.nullValue;

/**
 * Basic Spring Data repository tests
 *
 * @author Gavin Martin
 */
@DataJpaTest
public class CakeRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CakeRepository repository;

    @Test
    public void givenValidCake_whenSavingCake_theCorrectResponse() {
        CakeEntity entity = entityManager.persist(new CakeEntity("Blueberry Cheesecake", "Test description", "http://localhost:8080/images/1", "Test user"));

        CakeEntity cake = repository.findById(entity.getId()).orElseThrow(RuntimeException::new);

        assertThat(cake.getId(), is(not(nullValue())));
        assertThat(cake.getTitle(), equalTo("Blueberry Cheesecake"));
        assertThat(cake.getDescription(), equalTo("Test description"));
        assertThat(cake.getImageUrl(), equalTo("http://localhost:8080/images/1"));
        assertThat(cake.getCreatedBy(), equalTo("Test user"));
    }

}
