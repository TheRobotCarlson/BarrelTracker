package co.therobotcarlson.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.therobotcarlson.domain.MashbillGrain;
import co.therobotcarlson.repository.MashbillGrainRepository;
import co.therobotcarlson.web.rest.errors.BadRequestAlertException;
import co.therobotcarlson.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing MashbillGrain.
 */
@RestController
@RequestMapping("/api")
public class MashbillGrainResource {

    private final Logger log = LoggerFactory.getLogger(MashbillGrainResource.class);

    private static final String ENTITY_NAME = "mashbillGrain";

    private final MashbillGrainRepository mashbillGrainRepository;

    public MashbillGrainResource(MashbillGrainRepository mashbillGrainRepository) {
        this.mashbillGrainRepository = mashbillGrainRepository;
    }

    /**
     * POST  /mashbill-grains : Create a new mashbillGrain.
     *
     * @param mashbillGrain the mashbillGrain to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mashbillGrain, or with status 400 (Bad Request) if the mashbillGrain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mashbill-grains")
    @Timed
    public ResponseEntity<MashbillGrain> createMashbillGrain(@Valid @RequestBody MashbillGrain mashbillGrain) throws URISyntaxException {
        log.debug("REST request to save MashbillGrain : {}", mashbillGrain);
        if (mashbillGrain.getId() != null) {
            throw new BadRequestAlertException("A new mashbillGrain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MashbillGrain result = mashbillGrainRepository.save(mashbillGrain);
        return ResponseEntity.created(new URI("/api/mashbill-grains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mashbill-grains : Updates an existing mashbillGrain.
     *
     * @param mashbillGrain the mashbillGrain to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mashbillGrain,
     * or with status 400 (Bad Request) if the mashbillGrain is not valid,
     * or with status 500 (Internal Server Error) if the mashbillGrain couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mashbill-grains")
    @Timed
    public ResponseEntity<MashbillGrain> updateMashbillGrain(@Valid @RequestBody MashbillGrain mashbillGrain) throws URISyntaxException {
        log.debug("REST request to update MashbillGrain : {}", mashbillGrain);
        if (mashbillGrain.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MashbillGrain result = mashbillGrainRepository.save(mashbillGrain);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mashbillGrain.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mashbill-grains : get all the mashbillGrains.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mashbillGrains in body
     */
    @GetMapping("/mashbill-grains")
    @Timed
    public List<MashbillGrain> getAllMashbillGrains() {
        log.debug("REST request to get all MashbillGrains");
        return mashbillGrainRepository.findAll();
    }

    /**
     * GET  /mashbill-grains/:id : get the "id" mashbillGrain.
     *
     * @param id the id of the mashbillGrain to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mashbillGrain, or with status 404 (Not Found)
     */
    @GetMapping("/mashbill-grains/{id}")
    @Timed
    public ResponseEntity<MashbillGrain> getMashbillGrain(@PathVariable Long id) {
        log.debug("REST request to get MashbillGrain : {}", id);
        Optional<MashbillGrain> mashbillGrain = mashbillGrainRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mashbillGrain);
    }


    /**
        GET /mashbill-grains/mashbill: get all the grains belonging to a mashbill

        @return the stuff and things
    
     */
    @GetMapping("/mashbill-grains/mashbills/{id}")
    @Timed
    public List<MashbillGrain> getAllMashbillGrainsForMashbill(@PathVariable Long id){
        log.debug("REST request to get all mashbill grains for mashbill: {}",id);
        List<MashbillGrain> actions = mashbillGrainRepository.findByMashbillId(id);
        return actions;
    }

    /**
     * DELETE  /mashbill-grains/:id : delete the "id" mashbillGrain.
     *
     * @param id the id of the mashbillGrain to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mashbill-grains/{id}")
    @Timed
    public ResponseEntity<Void> deleteMashbillGrain(@PathVariable Long id) {
        log.debug("REST request to delete MashbillGrain : {}", id);

        mashbillGrainRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
