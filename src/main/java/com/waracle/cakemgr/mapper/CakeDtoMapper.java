package com.waracle.cakemgr.mapper;

import com.waracle.cakemgr.domain.CakeDto;
import com.waracle.cakemgr.repository.CakeEntity;
import org.mapstruct.Mapper;
import org.springframework.core.convert.converter.Converter;

/**
 * Mapstruct converter for DTO to entity conversion
 *
 * @author Gavin Martin
 */
@Mapper(config = MapperSpringConfig.class)
public interface CakeDtoMapper extends Converter<CakeDto, CakeEntity> {
    CakeEntity convert(CakeDto dto);
}