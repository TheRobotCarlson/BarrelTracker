package co.therobotcarlson.web.rest;

import co.therobotcarlson.DistilledApp;

import co.therobotcarlson.domain.Barrel;
import co.therobotcarlson.repository.BarrelRepository;
import co.therobotcarlson.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static co.therobotcarlson.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BarrelResource REST controller.
 *
 * @see BarrelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class BarrelResourceIntTest {

    @Autowired
    private BarrelRepository barrelRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBarrelMockMvc;

    private Barrel barrel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BarrelResource barrelResource = new BarrelResource(barrelRepository);
        this.restBarrelMockMvc = MockMvcBuilders.standaloneSetup(barrelResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Barrel createEntity(EntityManager em) {
        Barrel barrel = new Barrel();
        return barrel;
    }

    @Before
    public void initTest() {
        barrel = createEntity(em);
    }

    @Test
    @Transactional
    public void createBarrel() throws Exception {
        int databaseSizeBeforeCreate = barrelRepository.findAll().size();

        // Create the Barrel
        restBarrelMockMvc.perform(post("/api/barrels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrel)))
            .andExpect(status().isCreated());

        // Validate the Barrel in the database
        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeCreate + 1);
        Barrel testBarrel = barrelList.get(barrelList.size() - 1);
    }

    @Test
    @Transactional
    public void createBarrelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = barrelRepository.findAll().size();

        // Create the Barrel with an existing ID
        barrel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBarrelMockMvc.perform(post("/api/barrels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrel)))
            .andExpect(status().isBadRequest());

        // Validate the Barrel in the database
        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBarrels() throws Exception {
        // Initialize the database
        barrelRepository.saveAndFlush(barrel);

        // Get all the barrelList
        restBarrelMockMvc.perform(get("/api/barrels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(barrel.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getBarrel() throws Exception {
        // Initialize the database
        barrelRepository.saveAndFlush(barrel);

        // Get the barrel
        restBarrelMockMvc.perform(get("/api/barrels/{id}", barrel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(barrel.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingBarrel() throws Exception {
        // Get the barrel
        restBarrelMockMvc.perform(get("/api/barrels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBarrel() throws Exception {
        // Initialize the database
        barrelRepository.saveAndFlush(barrel);

        int databaseSizeBeforeUpdate = barrelRepository.findAll().size();

        // Update the barrel
        Barrel updatedBarrel = barrelRepository.findById(barrel.getId()).get();
        // Disconnect from session so that the updates on updatedBarrel are not directly saved in db
        em.detach(updatedBarrel);

        restBarrelMockMvc.perform(put("/api/barrels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBarrel)))
            .andExpect(status().isOk());

        // Validate the Barrel in the database
        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeUpdate);
        Barrel testBarrel = barrelList.get(barrelList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingBarrel() throws Exception {
        int databaseSizeBeforeUpdate = barrelRepository.findAll().size();

        // Create the Barrel

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBarrelMockMvc.perform(put("/api/barrels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrel)))
            .andExpect(status().isBadRequest());

        // Validate the Barrel in the database
        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBarrel() throws Exception {
        // Initialize the database
        barrelRepository.saveAndFlush(barrel);

        int databaseSizeBeforeDelete = barrelRepository.findAll().size();

        // Get the barrel
        restBarrelMockMvc.perform(delete("/api/barrels/{id}", barrel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Barrel> barrelList = barrelRepository.findAll();
        assertThat(barrelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Barrel.class);
        Barrel barrel1 = new Barrel();
        barrel1.setId(1L);
        Barrel barrel2 = new Barrel();
        barrel2.setId(barrel1.getId());
        assertThat(barrel1).isEqualTo(barrel2);
        barrel2.setId(2L);
        assertThat(barrel1).isNotEqualTo(barrel2);
        barrel1.setId(null);
        assertThat(barrel1).isNotEqualTo(barrel2);
    }
}
