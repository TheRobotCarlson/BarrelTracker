package co.therobotcarlson.web.rest;

import co.therobotcarlson.DistilledApp;

import co.therobotcarlson.domain.Grain;
import co.therobotcarlson.repository.GrainRepository;
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
 * Test class for the GrainResource REST controller.
 *
 * @see GrainResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class GrainResourceIntTest {

    private static final String DEFAULT_GRAIN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_GRAIN_NAME = "BBBBBBBBBB";

    @Autowired
    private GrainRepository grainRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGrainMockMvc;

    private Grain grain;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GrainResource grainResource = new GrainResource(grainRepository);
        this.restGrainMockMvc = MockMvcBuilders.standaloneSetup(grainResource)
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
    public static Grain createEntity(EntityManager em) {
        Grain grain = new Grain()
            .grainName(DEFAULT_GRAIN_NAME);
        return grain;
    }

    @Before
    public void initTest() {
        grain = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrain() throws Exception {
        int databaseSizeBeforeCreate = grainRepository.findAll().size();

        // Create the Grain
        restGrainMockMvc.perform(post("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grain)))
            .andExpect(status().isCreated());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeCreate + 1);
        Grain testGrain = grainList.get(grainList.size() - 1);
        assertThat(testGrain.getGrainName()).isEqualTo(DEFAULT_GRAIN_NAME);
    }

    @Test
    @Transactional
    public void createGrainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = grainRepository.findAll().size();

        // Create the Grain with an existing ID
        grain.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGrainMockMvc.perform(post("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grain)))
            .andExpect(status().isBadRequest());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkGrainNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = grainRepository.findAll().size();
        // set the field null
        grain.setGrainName(null);

        // Create the Grain, which fails.

        restGrainMockMvc.perform(post("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grain)))
            .andExpect(status().isBadRequest());

        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGrains() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);

        // Get all the grainList
        restGrainMockMvc.perform(get("/api/grains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grain.getId().intValue())))
            .andExpect(jsonPath("$.[*].grainName").value(hasItem(DEFAULT_GRAIN_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getGrain() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);

        // Get the grain
        restGrainMockMvc.perform(get("/api/grains/{id}", grain.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(grain.getId().intValue()))
            .andExpect(jsonPath("$.grainName").value(DEFAULT_GRAIN_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingGrain() throws Exception {
        // Get the grain
        restGrainMockMvc.perform(get("/api/grains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrain() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);

        int databaseSizeBeforeUpdate = grainRepository.findAll().size();

        // Update the grain
        Grain updatedGrain = grainRepository.findById(grain.getId()).get();
        // Disconnect from session so that the updates on updatedGrain are not directly saved in db
        em.detach(updatedGrain);
        updatedGrain
            .grainName(UPDATED_GRAIN_NAME);

        restGrainMockMvc.perform(put("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrain)))
            .andExpect(status().isOk());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeUpdate);
        Grain testGrain = grainList.get(grainList.size() - 1);
        assertThat(testGrain.getGrainName()).isEqualTo(UPDATED_GRAIN_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGrain() throws Exception {
        int databaseSizeBeforeUpdate = grainRepository.findAll().size();

        // Create the Grain

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGrainMockMvc.perform(put("/api/grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(grain)))
            .andExpect(status().isBadRequest());

        // Validate the Grain in the database
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGrain() throws Exception {
        // Initialize the database
        grainRepository.saveAndFlush(grain);

        int databaseSizeBeforeDelete = grainRepository.findAll().size();

        // Get the grain
        restGrainMockMvc.perform(delete("/api/grains/{id}", grain.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Grain> grainList = grainRepository.findAll();
        assertThat(grainList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Grain.class);
        Grain grain1 = new Grain();
        grain1.setId(1L);
        Grain grain2 = new Grain();
        grain2.setId(grain1.getId());
        assertThat(grain1).isEqualTo(grain2);
        grain2.setId(2L);
        assertThat(grain1).isNotEqualTo(grain2);
        grain1.setId(null);
        assertThat(grain1).isNotEqualTo(grain2);
    }
}
