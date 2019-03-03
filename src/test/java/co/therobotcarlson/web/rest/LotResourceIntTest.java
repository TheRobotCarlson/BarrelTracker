package co.therobotcarlson.web.rest;

import co.therobotcarlson.DistilledApp;

import co.therobotcarlson.domain.Lot;
import co.therobotcarlson.repository.LotRepository;
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
 * Test class for the LotResource REST controller.
 *
 * @see LotResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DistilledApp.class)
public class LotResourceIntTest {

    private static final Integer DEFAULT_BARREL_CAPACITY = 1;
    private static final Integer UPDATED_BARREL_CAPACITY = 2;

    private static final String DEFAULT_LOT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LOT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    @Autowired
    private LotRepository lotRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLotMockMvc;

    private Lot lot;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LotResource lotResource = new LotResource(lotRepository);
        this.restLotMockMvc = MockMvcBuilders.standaloneSetup(lotResource)
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
    public static Lot createEntity(EntityManager em) {
        Lot lot = new Lot()
            .barrelCapacity(DEFAULT_BARREL_CAPACITY)
            .lotName(DEFAULT_LOT_NAME)
            .location(DEFAULT_LOCATION);
        return lot;
    }

    @Before
    public void initTest() {
        lot = createEntity(em);
    }

    @Test
    @Transactional
    public void createLot() throws Exception {
        int databaseSizeBeforeCreate = lotRepository.findAll().size();

        // Create the Lot
        restLotMockMvc.perform(post("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lot)))
            .andExpect(status().isCreated());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeCreate + 1);
        Lot testLot = lotList.get(lotList.size() - 1);
        assertThat(testLot.getBarrelCapacity()).isEqualTo(DEFAULT_BARREL_CAPACITY);
        assertThat(testLot.getLotName()).isEqualTo(DEFAULT_LOT_NAME);
        assertThat(testLot.getLocation()).isEqualTo(DEFAULT_LOCATION);
    }

    @Test
    @Transactional
    public void createLotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lotRepository.findAll().size();

        // Create the Lot with an existing ID
        lot.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLotMockMvc.perform(post("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lot)))
            .andExpect(status().isBadRequest());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLots() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList
        restLotMockMvc.perform(get("/api/lots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lot.getId().intValue())))
            .andExpect(jsonPath("$.[*].barrelCapacity").value(hasItem(DEFAULT_BARREL_CAPACITY)))
            .andExpect(jsonPath("$.[*].lotName").value(hasItem(DEFAULT_LOT_NAME.toString())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())));
    }
    

    @Test
    @Transactional
    public void getLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get the lot
        restLotMockMvc.perform(get("/api/lots/{id}", lot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lot.getId().intValue()))
            .andExpect(jsonPath("$.barrelCapacity").value(DEFAULT_BARREL_CAPACITY))
            .andExpect(jsonPath("$.lotName").value(DEFAULT_LOT_NAME.toString()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLot() throws Exception {
        // Get the lot
        restLotMockMvc.perform(get("/api/lots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        int databaseSizeBeforeUpdate = lotRepository.findAll().size();

        // Update the lot
        Lot updatedLot = lotRepository.findById(lot.getId()).get();
        // Disconnect from session so that the updates on updatedLot are not directly saved in db
        em.detach(updatedLot);
        updatedLot
            .barrelCapacity(UPDATED_BARREL_CAPACITY)
            .lotName(UPDATED_LOT_NAME)
            .location(UPDATED_LOCATION);

        restLotMockMvc.perform(put("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLot)))
            .andExpect(status().isOk());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeUpdate);
        Lot testLot = lotList.get(lotList.size() - 1);
        assertThat(testLot.getBarrelCapacity()).isEqualTo(UPDATED_BARREL_CAPACITY);
        assertThat(testLot.getLotName()).isEqualTo(UPDATED_LOT_NAME);
        assertThat(testLot.getLocation()).isEqualTo(UPDATED_LOCATION);
    }

    @Test
    @Transactional
    public void updateNonExistingLot() throws Exception {
        int databaseSizeBeforeUpdate = lotRepository.findAll().size();

        // Create the Lot

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLotMockMvc.perform(put("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lot)))
            .andExpect(status().isBadRequest());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        int databaseSizeBeforeDelete = lotRepository.findAll().size();

        // Get the lot
        restLotMockMvc.perform(delete("/api/lots/{id}", lot.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lot.class);
        Lot lot1 = new Lot();
        lot1.setId(1L);
        Lot lot2 = new Lot();
        lot2.setId(lot1.getId());
        assertThat(lot1).isEqualTo(lot2);
        lot2.setId(2L);
        assertThat(lot1).isNotEqualTo(lot2);
        lot1.setId(null);
        assertThat(lot1).isNotEqualTo(lot2);
    }
}
