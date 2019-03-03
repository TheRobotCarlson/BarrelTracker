package co.therobotcarlson.web.rest;

import co.therobotcarlson.DistilledApp;

import co.therobotcarlson.domain.Yeast;
import co.therobotcarlson.repository.YeastRepository;
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
 * Test class for the YeastResource REST controller.
 *
 * @see YeastResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class YeastResourceIntTest {

    private static final String DEFAULT_YEAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_YEAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_YEAST_CODE = "AAAAAAAAAA";
    private static final String UPDATED_YEAST_CODE = "BBBBBBBBBB";

    @Autowired
    private YeastRepository yeastRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restYeastMockMvc;

    private Yeast yeast;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final YeastResource yeastResource = new YeastResource(yeastRepository);
        this.restYeastMockMvc = MockMvcBuilders.standaloneSetup(yeastResource)
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
    public static Yeast createEntity(EntityManager em) {
        Yeast yeast = new Yeast()
            .yeastName(DEFAULT_YEAST_NAME)
            .yeastCode(DEFAULT_YEAST_CODE);
        return yeast;
    }

    @Before
    public void initTest() {
        yeast = createEntity(em);
    }

    @Test
    @Transactional
    public void createYeast() throws Exception {
        int databaseSizeBeforeCreate = yeastRepository.findAll().size();

        // Create the Yeast
        restYeastMockMvc.perform(post("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeast)))
            .andExpect(status().isCreated());

        // Validate the Yeast in the database
        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeCreate + 1);
        Yeast testYeast = yeastList.get(yeastList.size() - 1);
        assertThat(testYeast.getYeastName()).isEqualTo(DEFAULT_YEAST_NAME);
        assertThat(testYeast.getYeastCode()).isEqualTo(DEFAULT_YEAST_CODE);
    }

    @Test
    @Transactional
    public void createYeastWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = yeastRepository.findAll().size();

        // Create the Yeast with an existing ID
        yeast.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restYeastMockMvc.perform(post("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeast)))
            .andExpect(status().isBadRequest());

        // Validate the Yeast in the database
        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkYeastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = yeastRepository.findAll().size();
        // set the field null
        yeast.setYeastName(null);

        // Create the Yeast, which fails.

        restYeastMockMvc.perform(post("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeast)))
            .andExpect(status().isBadRequest());

        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkYeastCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = yeastRepository.findAll().size();
        // set the field null
        yeast.setYeastCode(null);

        // Create the Yeast, which fails.

        restYeastMockMvc.perform(post("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeast)))
            .andExpect(status().isBadRequest());

        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllYeasts() throws Exception {
        // Initialize the database
        yeastRepository.saveAndFlush(yeast);

        // Get all the yeastList
        restYeastMockMvc.perform(get("/api/yeasts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(yeast.getId().intValue())))
            .andExpect(jsonPath("$.[*].yeastName").value(hasItem(DEFAULT_YEAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].yeastCode").value(hasItem(DEFAULT_YEAST_CODE.toString())));
    }
    

    @Test
    @Transactional
    public void getYeast() throws Exception {
        // Initialize the database
        yeastRepository.saveAndFlush(yeast);

        // Get the yeast
        restYeastMockMvc.perform(get("/api/yeasts/{id}", yeast.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(yeast.getId().intValue()))
            .andExpect(jsonPath("$.yeastName").value(DEFAULT_YEAST_NAME.toString()))
            .andExpect(jsonPath("$.yeastCode").value(DEFAULT_YEAST_CODE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingYeast() throws Exception {
        // Get the yeast
        restYeastMockMvc.perform(get("/api/yeasts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateYeast() throws Exception {
        // Initialize the database
        yeastRepository.saveAndFlush(yeast);

        int databaseSizeBeforeUpdate = yeastRepository.findAll().size();

        // Update the yeast
        Yeast updatedYeast = yeastRepository.findById(yeast.getId()).get();
        // Disconnect from session so that the updates on updatedYeast are not directly saved in db
        em.detach(updatedYeast);
        updatedYeast
            .yeastName(UPDATED_YEAST_NAME)
            .yeastCode(UPDATED_YEAST_CODE);

        restYeastMockMvc.perform(put("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedYeast)))
            .andExpect(status().isOk());

        // Validate the Yeast in the database
        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeUpdate);
        Yeast testYeast = yeastList.get(yeastList.size() - 1);
        assertThat(testYeast.getYeastName()).isEqualTo(UPDATED_YEAST_NAME);
        assertThat(testYeast.getYeastCode()).isEqualTo(UPDATED_YEAST_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingYeast() throws Exception {
        int databaseSizeBeforeUpdate = yeastRepository.findAll().size();

        // Create the Yeast

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restYeastMockMvc.perform(put("/api/yeasts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(yeast)))
            .andExpect(status().isBadRequest());

        // Validate the Yeast in the database
        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteYeast() throws Exception {
        // Initialize the database
        yeastRepository.saveAndFlush(yeast);

        int databaseSizeBeforeDelete = yeastRepository.findAll().size();

        // Get the yeast
        restYeastMockMvc.perform(delete("/api/yeasts/{id}", yeast.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Yeast> yeastList = yeastRepository.findAll();
        assertThat(yeastList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Yeast.class);
        Yeast yeast1 = new Yeast();
        yeast1.setId(1L);
        Yeast yeast2 = new Yeast();
        yeast2.setId(yeast1.getId());
        assertThat(yeast1).isEqualTo(yeast2);
        yeast2.setId(2L);
        assertThat(yeast1).isNotEqualTo(yeast2);
        yeast1.setId(null);
        assertThat(yeast1).isNotEqualTo(yeast2);
    }
}
