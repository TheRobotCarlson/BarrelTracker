package co.therobotcarlson.web.rest;

import co.therobotcarlson.DistilledApp;

import co.therobotcarlson.domain.MashbillGrain;
import co.therobotcarlson.repository.MashbillGrainRepository;
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
 * Test class for the MashbillGrainResource REST controller.
 *
 * @see MashbillGrainResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class MashbillGrainResourceIntTest {

    private static final Double DEFAULT_QUANTITY = 0D;
    private static final Double UPDATED_QUANTITY = 1D;

    @Autowired
    private MashbillGrainRepository mashbillGrainRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMashbillGrainMockMvc;

    private MashbillGrain mashbillGrain;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MashbillGrainResource mashbillGrainResource = new MashbillGrainResource(mashbillGrainRepository);
        this.restMashbillGrainMockMvc = MockMvcBuilders.standaloneSetup(mashbillGrainResource)
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
    public static MashbillGrain createEntity(EntityManager em) {
        MashbillGrain mashbillGrain = new MashbillGrain()
            .quantity(DEFAULT_QUANTITY);
        return mashbillGrain;
    }

    @Before
    public void initTest() {
        mashbillGrain = createEntity(em);
    }

    @Test
    @Transactional
    public void createMashbillGrain() throws Exception {
        int databaseSizeBeforeCreate = mashbillGrainRepository.findAll().size();

        // Create the MashbillGrain
        restMashbillGrainMockMvc.perform(post("/api/mashbill-grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillGrain)))
            .andExpect(status().isCreated());

        // Validate the MashbillGrain in the database
        List<MashbillGrain> mashbillGrainList = mashbillGrainRepository.findAll();
        assertThat(mashbillGrainList).hasSize(databaseSizeBeforeCreate + 1);
        MashbillGrain testMashbillGrain = mashbillGrainList.get(mashbillGrainList.size() - 1);
        assertThat(testMashbillGrain.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createMashbillGrainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mashbillGrainRepository.findAll().size();

        // Create the MashbillGrain with an existing ID
        mashbillGrain.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMashbillGrainMockMvc.perform(post("/api/mashbill-grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillGrain)))
            .andExpect(status().isBadRequest());

        // Validate the MashbillGrain in the database
        List<MashbillGrain> mashbillGrainList = mashbillGrainRepository.findAll();
        assertThat(mashbillGrainList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMashbillGrains() throws Exception {
        // Initialize the database
        mashbillGrainRepository.saveAndFlush(mashbillGrain);

        // Get all the mashbillGrainList
        restMashbillGrainMockMvc.perform(get("/api/mashbill-grains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mashbillGrain.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.doubleValue())));
    }
    

    @Test
    @Transactional
    public void getMashbillGrain() throws Exception {
        // Initialize the database
        mashbillGrainRepository.saveAndFlush(mashbillGrain);

        // Get the mashbillGrain
        restMashbillGrainMockMvc.perform(get("/api/mashbill-grains/{id}", mashbillGrain.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mashbillGrain.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMashbillGrain() throws Exception {
        // Get the mashbillGrain
        restMashbillGrainMockMvc.perform(get("/api/mashbill-grains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMashbillGrain() throws Exception {
        // Initialize the database
        mashbillGrainRepository.saveAndFlush(mashbillGrain);

        int databaseSizeBeforeUpdate = mashbillGrainRepository.findAll().size();

        // Update the mashbillGrain
        MashbillGrain updatedMashbillGrain = mashbillGrainRepository.findById(mashbillGrain.getId()).get();
        // Disconnect from session so that the updates on updatedMashbillGrain are not directly saved in db
        em.detach(updatedMashbillGrain);
        updatedMashbillGrain
            .quantity(UPDATED_QUANTITY);

        restMashbillGrainMockMvc.perform(put("/api/mashbill-grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMashbillGrain)))
            .andExpect(status().isOk());

        // Validate the MashbillGrain in the database
        List<MashbillGrain> mashbillGrainList = mashbillGrainRepository.findAll();
        assertThat(mashbillGrainList).hasSize(databaseSizeBeforeUpdate);
        MashbillGrain testMashbillGrain = mashbillGrainList.get(mashbillGrainList.size() - 1);
        assertThat(testMashbillGrain.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingMashbillGrain() throws Exception {
        int databaseSizeBeforeUpdate = mashbillGrainRepository.findAll().size();

        // Create the MashbillGrain

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMashbillGrainMockMvc.perform(put("/api/mashbill-grains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbillGrain)))
            .andExpect(status().isBadRequest());

        // Validate the MashbillGrain in the database
        List<MashbillGrain> mashbillGrainList = mashbillGrainRepository.findAll();
        assertThat(mashbillGrainList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMashbillGrain() throws Exception {
        // Initialize the database
        mashbillGrainRepository.saveAndFlush(mashbillGrain);

        int databaseSizeBeforeDelete = mashbillGrainRepository.findAll().size();

        // Get the mashbillGrain
        restMashbillGrainMockMvc.perform(delete("/api/mashbill-grains/{id}", mashbillGrain.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MashbillGrain> mashbillGrainList = mashbillGrainRepository.findAll();
        assertThat(mashbillGrainList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MashbillGrain.class);
        MashbillGrain mashbillGrain1 = new MashbillGrain();
        mashbillGrain1.setId(1L);
        MashbillGrain mashbillGrain2 = new MashbillGrain();
        mashbillGrain2.setId(mashbillGrain1.getId());
        assertThat(mashbillGrain1).isEqualTo(mashbillGrain2);
        mashbillGrain2.setId(2L);
        assertThat(mashbillGrain1).isNotEqualTo(mashbillGrain2);
        mashbillGrain1.setId(null);
        assertThat(mashbillGrain1).isNotEqualTo(mashbillGrain2);
    }
}
