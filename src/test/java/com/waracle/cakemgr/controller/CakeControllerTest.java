package com.waracle.cakemgr.controller;

import com.waracle.cakemgr.repository.CakeEntity;
import com.waracle.cakemgr.repository.CakeFixtures;
import com.waracle.cakemgr.service.CakeService;
import org.hamcrest.core.IsNull;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.*;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

/**
 * Test that the Cake object is validated when being supplied by the client to the server.
 *
 * Use MockMvc so that we are only checking the controller component
 * All other services are mocked to provide dummy data
 *
 * @author Gavin Martin
 */
@SpringBootTest
@AutoConfigureMockMvc
public class CakeControllerTest {
    @MockBean
    private CakeService cakeService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /cakes success")
    public void whenGetRequestToCakesAndAnonymousUser_theCorrectResponse() throws Exception {
        CakeEntity fixture1 = CakeFixtures.blueberryCheesecake();
        CakeEntity fixture2 = CakeFixtures.mangoCheesecake();
        List<CakeEntity> fixtures = Arrays.asList(fixture1, fixture2);
        // mock cake service findAll operation to return fixtures
        when(cakeService.findAll()).thenReturn(fixtures);

        // call cake controller and check response was OK
        mockMvc.perform(MockMvcRequestBuilders
                .get("/cakes"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    @DisplayName("POST /cakes success")
    // @WithMockUser(username="user1", roles = "USER")
    public void whenPostRequestToCakesAndValidUser_thenCorrectResponse() throws Exception {
        // mock cake service to return fixture upon save operation
        when(cakeService.save(Mockito.any(CakeEntity.class))).thenAnswer((e) -> CakeFixtures.blueberryCheesecake());

        String cake = "{\"title\": \"Blueberry Cheesecake\", \"description\" : \"Test description\", \"imageUrl\" : \"http://localhost:8080/images/1\" }";

        // call cake controller and check response was OK (200)
        // {"id":1,"title":"Test description","description":null,"imageUrl":"http://localhost:8080/images/1"}
        mockMvc.perform(MockMvcRequestBuilders
                .post("/cakes")
                .with(csrf())
                .with(oauth2Login().oauth2User(getOAuth2UserInfo()))
                .content(cake)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print())
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.title").value("Blueberry Cheesecake"))
                .andExpect(jsonPath("$.description").value("Test description"))
                .andExpect(jsonPath("$.imageUrl").value("http://localhost:8080/images/1"));
    }

    @Test
    @DisplayName("POST /cakes invalid cake")
    public void whenPostRequestToCakesAndInvalidCake_thenFails() throws Exception {
        String cake = "{\"title\": \"\", \"description\" : \"Fresh new cheesecake\", \"imageUrl\" : \"http://localhost:8080/images/1\" }";

        // call cake controller and check response was a bad request (400)
        // {"message":"Please review your inputs","description":null,"fieldErrors":[{"objectName":"cakeDto","field":"title","message":"Please provide a title"}]}
        mockMvc.perform(MockMvcRequestBuilders
                .post("/cakes")
                .with(csrf())
                .with(oauth2Login().oauth2User(getOAuth2UserInfo()))
                .content(cake)
                .locale(Locale.ENGLISH)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Please review your inputs"))
                .andExpect(jsonPath("$.description").value(IsNull.nullValue()))
                .andExpect(jsonPath("$.fieldErrors[0].objectName").value("cakeDto"))
                .andExpect(jsonPath("$.fieldErrors[0].field").value("title"))
                .andExpect(jsonPath("$.fieldErrors[0].message").value("Please provide a title"))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @DisplayName("POST /cakes invalid user")
    public void whenPostRequestToCakesAndInvalidUser_thenFails() throws Exception {
        String cake = "{\"title\": \"New cheesecake\", \"description\" : \"Fresh new cheesecake\", \"imageUrl\" : \"http://localhost:8080/images/1\" }";

        // call cake controller and check response was unauthorised (401)
        mockMvc.perform(MockMvcRequestBuilders
                .post("/cakes")
                .with(csrf())
                .content(cake)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isUnauthorized());
    }

    @Test
    @DisplayName("POST /cakes invalid csrf")
    public void whenPostRequestToCakesAndInvalidCsrfToken_thenFails() throws Exception {
        String cake = "{\"title\": \"New cheesecake\", \"description\" : \"Fresh new cheesecake\", \"imageUrl\" : \"http://localhost:8080/images/1\" }";

        // call cake controller and check response was a bad request (403)
        mockMvc.perform(MockMvcRequestBuilders
                .post("/cakes")
                .with(oauth2Login().oauth2User(getOAuth2UserInfo()))
                .content(cake)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
    }


    private static OAuth2User getOAuth2UserInfo() {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", "user");
        claims.put("login", "Test");
        claims.put("company", "test@test.com");
        claims.put("avatar_url", "http://test.com/images/1");

        OAuth2UserAuthority authority = new OAuth2UserAuthority(claims);

        return new DefaultOAuth2User(
                Collections.singletonList(authority),
                claims,
                "login");
    }


}
