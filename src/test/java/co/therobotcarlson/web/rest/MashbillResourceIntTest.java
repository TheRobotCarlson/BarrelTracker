package co.therobotcarlson.web.rest;

import co.therobotcarlson.DistilledApp;

import co.therobotcarlson.domain.Mashbill;
import co.therobotcarlson.repository.MashbillRepository;
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
 * Test class for the MashbillResource REST controller.
 *
 * @see MashbillResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class MashbillResourceIntTest {

    private static final String DEFAULT_MASHBILL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MASHBILL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_MASHBILL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_MASHBILL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_MASHBILL_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_MASHBILL_NOTES = "BBBBBBBBBB";

    @Autowired
    private MashbillRepository mashbillRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMashbillMockMvc;

    private Mashbill mashbill;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MashbillResource mashbillResource = new MashbillResource(mashbillRepository);
        this.restMashbillMockMvc = MockMvcBuilders.standaloneSetup(mashbillResource)
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
    public static Mashbill createEntity(EntityManager em) {
        Mashbill mashbill = new Mashbill()
            .mashbillName(DEFAULT_MASHBILL_NAME)
            .mashbillCode(DEFAULT_MASHBILL_CODE)
            .mashbillNotes(DEFAULT_MASHBILL_NOTES);
        return mashbill;
    }

    @Before
    public void initTest() {
        mashbill = createEntity(em);
    }

    @Test
    @Transactional
    public void createMashbill() throws Exception {
        int databaseSizeBeforeCreate = mashbillRepository.findAll().size();

        // Create the Mashbill
        restMashbillMockMvc.perform(post("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbill)))
            .andExpect(status().isCreated());

        // Validate the Mashbill in the database
        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeCreate + 1);
        Mashbill testMashbill = mashbillList.get(mashbillList.size() - 1);
        assertThat(testMashbill.getMashbillName()).isEqualTo(DEFAULT_MASHBILL_NAME);
        assertThat(testMashbill.getMashbillCode()).isEqualTo(DEFAULT_MASHBILL_CODE);
        assertThat(testMashbill.getMashbillNotes()).isEqualTo(DEFAULT_MASHBILL_NOTES);
    }

    @Test
    @Transactional
    public void createMashbillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mashbillRepository.findAll().size();

        // Create the Mashbill with an existing ID
        mashbill.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMashbillMockMvc.perform(post("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbill)))
            .andExpect(status().isBadRequest());

        // Validate the Mashbill in the database
        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkMashbillNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = mashbillRepository.findAll().size();
        // set the field null
        mashbill.setMashbillName(null);

        // Create the Mashbill, which fails.

        restMashbillMockMvc.perform(post("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbill)))
            .andExpect(status().isBadRequest());

        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMashbillCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = mashbillRepository.findAll().size();
        // set the field null
        mashbill.setMashbillCode(null);

        // Create the Mashbill, which fails.

        restMashbillMockMvc.perform(post("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbill)))
            .andExpect(status().isBadRequest());

        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMashbills() throws Exception {
        // Initialize the database
        mashbillRepository.saveAndFlush(mashbill);

        // Get all the mashbillList
        restMashbillMockMvc.perform(get("/api/mashbills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mashbill.getId().intValue())))
            .andExpect(jsonPath("$.[*].mashbillName").value(hasItem(DEFAULT_MASHBILL_NAME.toString())))
            .andExpect(jsonPath("$.[*].mashbillCode").value(hasItem(DEFAULT_MASHBILL_CODE.toString())))
            .andExpect(jsonPath("$.[*].mashbillNotes").value(hasItem(DEFAULT_MASHBILL_NOTES.toString())));
    }
    

    @Test
    @Transactional
    public void getMashbill() throws Exception {
        // Initialize the database
        mashbillRepository.saveAndFlush(mashbill);

        // Get the mashbill
        restMashbillMockMvc.perform(get("/api/mashbills/{id}", mashbill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mashbill.getId().intValue()))
            .andExpect(jsonPath("$.mashbillName").value(DEFAULT_MASHBILL_NAME.toString()))
            .andExpect(jsonPath("$.mashbillCode").value(DEFAULT_MASHBILL_CODE.toString()))
            .andExpect(jsonPath("$.mashbillNotes").value(DEFAULT_MASHBILL_NOTES.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMashbill() throws Exception {
        // Get the mashbill
        restMashbillMockMvc.perform(get("/api/mashbills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMashbill() throws Exception {
        // Initialize the database
        mashbillRepository.saveAndFlush(mashbill);

        int databaseSizeBeforeUpdate = mashbillRepository.findAll().size();

        // Update the mashbill
        Mashbill updatedMashbill = mashbillRepository.findById(mashbill.getId()).get();
        // Disconnect from session so that the updates on updatedMashbill are not directly saved in db
        em.detach(updatedMashbill);
        updatedMashbill
            .mashbillName(UPDATED_MASHBILL_NAME)
            .mashbillCode(UPDATED_MASHBILL_CODE)
            .mashbillNotes(UPDATED_MASHBILL_NOTES);

        restMashbillMockMvc.perform(put("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMashbill)))
            .andExpect(status().isOk());

        // Validate the Mashbill in the database
        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeUpdate);
        Mashbill testMashbill = mashbillList.get(mashbillList.size() - 1);
        assertThat(testMashbill.getMashbillName()).isEqualTo(UPDATED_MASHBILL_NAME);
        assertThat(testMashbill.getMashbillCode()).isEqualTo(UPDATED_MASHBILL_CODE);
        assertThat(testMashbill.getMashbillNotes()).isEqualTo(UPDATED_MASHBILL_NOTES);
    }

    @Test
    @Transactional
    public void updateNonExistingMashbill() throws Exception {
        int databaseSizeBeforeUpdate = mashbillRepository.findAll().size();

        // Create the Mashbill

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMashbillMockMvc.perform(put("/api/mashbills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mashbill)))
            .andExpect(status().isBadRequest());

        // Validate the Mashbill in the database
        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMashbill() throws Exception {
        // Initialize the database
        mashbillRepository.saveAndFlush(mashbill);

        int databaseSizeBeforeDelete = mashbillRepository.findAll().size();

        // Get the mashbill
        restMashbillMockMvc.perform(delete("/api/mashbills/{id}", mashbill.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mashbill> mashbillList = mashbillRepository.findAll();
        assertThat(mashbillList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mashbill.class);
        Mashbill mashbill1 = new Mashbill();
        mashbill1.setId(1L);
        Mashbill mashbill2 = new Mashbill();
        mashbill2.setId(mashbill1.getId());
        assertThat(mashbill1).isEqualTo(mashbill2);
        mashbill2.setId(2L);
        assertThat(mashbill1).isNotEqualTo(mashbill2);
        mashbill1.setId(null);
        assertThat(mashbill1).isNotEqualTo(mashbill2);
    }
}
