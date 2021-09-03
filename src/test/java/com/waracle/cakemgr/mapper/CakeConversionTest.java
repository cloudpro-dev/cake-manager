package com.waracle.cakemgr.mapper;

import com.waracle.cakemgr.domain.CakeDto;
import com.waracle.cakemgr.repository.CakeEntity;
import com.waracle.cakemgr.repository.CakeFixtures;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.format.support.FormattingConversionService;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

/**
 * Test suite to ensure DTO conversion is sound
 *
 * @author Gavin Martin
 */
@SpringBootTest
public class CakeConversionTest {

    @Autowired
    private FormattingConversionService conversionService;

    @Test
    @DisplayName("Convert entity to DTO")
    public void givenEntity_whenConverting_thenCorrectValues() {
        CakeEntity entity = CakeFixtures.blueberryCheesecake();
        CakeDto dto = conversionService.convert(entity, CakeDto.class);

        assertThat(dto.getId(), equalTo(Long.valueOf(1)));
        assertThat(dto.getTitle(), equalTo("Blueberry Cheesecake"));
        assertThat(dto.getDescription(), equalTo("Test description"));
        assertThat(dto.getImageUrl(), equalTo("http://localhost:8080/images/1"));
        assertThat(dto.getCreatedBy(), equalTo("Test user"));
    }

    @Test
    @DisplayName("Convert DTO to entity")
    public void givenDto_whenConverting_thenCorrectValues() {
        CakeDto dto = CakeFixtures.passionFruitCheesecake();
        CakeEntity entity = conversionService.convert(dto, CakeEntity.class);

        assertThat(entity.getId(), equalTo(Long.valueOf(4)));
        assertThat(entity.getTitle(), equalTo("Passion fruit cheesecake"));
        assertThat(entity.getDescription(), equalTo("Test description"));
        assertThat(entity.getImageUrl(), equalTo("http://localhost:8080/images/2"));
        assertThat(entity.getCreatedBy(), is(nullValue()));
    }
}
