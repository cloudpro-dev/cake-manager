package com.waracle.cakemgr.controller;

import com.waracle.cakemgr.domain.CakeDto;
import com.waracle.cakemgr.repository.CakeEntity;
import com.waracle.cakemgr.service.CakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.support.FormattingConversionService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * REST API entrypoint for clients
 *
 * @author Gavin Martin
 */
@RestController
@RequestMapping("/cakes")
public class CakeController {

    private final CakeService cakeService;

    private final FormattingConversionService conversionService;

    @Autowired
    public CakeController(CakeService cakeService, FormattingConversionService conversionService) {
        this.cakeService = cakeService;
        this.conversionService = conversionService;
    }

    @GetMapping
    public Collection<CakeDto> findAll() {
        Iterable<CakeEntity> cakes = this.cakeService.findAll();
        List<CakeDto> cakeDtos = new ArrayList<>();
        cakes.forEach(c -> cakeDtos.add(conversionService.convert(c, CakeDto.class)));
        return cakeDtos;
    }

    @PostMapping
    public CakeDto addCake(@Valid @RequestBody CakeDto dto, @AuthenticationPrincipal OAuth2User principal) {
        CakeEntity userCake = conversionService.convert(dto, CakeEntity.class);
        // use GitHub login attribute for username in application
        userCake.setCreatedBy(principal.getAttribute("login"));
        CakeEntity entity = cakeService.save(userCake);
        return conversionService.convert(entity, CakeDto.class);
    }
}
