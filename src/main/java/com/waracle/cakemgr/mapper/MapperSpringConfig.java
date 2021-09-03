package com.waracle.cakemgr.mapper;

import org.mapstruct.MapperConfig;
import org.mapstruct.extensions.spring.converter.ConversionServiceAdapter;

/**
 * Setup Mapstruct Spring integration
 *
 * @author Gavin Martin
 */
@MapperConfig(componentModel = "spring", uses = ConversionServiceAdapter.class)
public interface MapperSpringConfig {
}