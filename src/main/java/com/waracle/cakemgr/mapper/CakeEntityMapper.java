package com.waracle.cakemgr.mapper;

import com.waracle.cakemgr.domain.CakeDto;
import com.waracle.cakemgr.repository.CakeEntity;
import org.mapstruct.Mapper;
import org.springframework.core.convert.converter.Converter;

/**
 * Mapstruct converter for entity to DTO conversion
 *
 * @author Gavin Martin
 */
@Mapper(config = MapperSpringConfig.class)
public interface CakeEntityMapper extends Converter<CakeEntity, CakeDto> {
    CakeDto convert(CakeEntity cake);
}