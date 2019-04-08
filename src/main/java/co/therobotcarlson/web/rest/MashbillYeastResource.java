package co.therobotcarlson.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.therobotcarlson.domain.MashbillYeast;
import co.therobotcarlson.repository.MashbillYeastRepository;
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
 * REST controller for managing MashbillYeast.
 */
@RestController
@RequestMapping("/api")
public class MashbillYeastResource {

    private final Logger log = LoggerFactory.getLogger(MashbillYeastResource.class);

    private static final String ENTITY_NAME = "mashbillYeast";

    private final MashbillYeastRepository mashbillYeastRepository;

    public MashbillYeastResource(MashbillYeastRepository mashbillYeastRepository) {
        this.mashbillYeastRepository = mashbillYeastRepository;
    }

    /**
     * POST  /mashbill-yeasts : Create a new mashbillYeast.
     *
     * @param mashbillYeast the mashbillYeast to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mashbillYeast, or with status 400 (Bad Request) if the mashbillYeast has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mashbill-yeasts")
    @Timed
    public ResponseEntity<MashbillYeast> createMashbillYeast(@Valid @RequestBody MashbillYeast mashbillYeast) throws URISyntaxException {
        log.debug("REST request to save MashbillYeast : {}", mashbillYeast);
        if (mashbillYeast.getId() != null) {
            throw new BadRequestAlertException("A new mashbillYeast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MashbillYeast result = mashbillYeastRepository.save(mashbillYeast);
        return ResponseEntity.created(new URI("/api/mashbill-yeasts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mashbill-yeasts : Updates an existing mashbillYeast.
     *
     * @param mashbillYeast the mashbillYeast to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mashbillYeast,
     * or with status 400 (Bad Request) if the mashbillYeast is not valid,
     * or with status 500 (Internal Server Error) if the mashbillYeast couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mashbill-yeasts")
    @Timed
    public ResponseEntity<MashbillYeast> updateMashbillYeast(@Valid @RequestBody MashbillYeast mashbillYeast) throws URISyntaxException {
        log.debug("REST request to update MashbillYeast : {}", mashbillYeast);
        if (mashbillYeast.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MashbillYeast result = mashbillYeastRepository.save(mashbillYeast);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mashbillYeast.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mashbill-yeasts : get all the mashbillYeasts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mashbillYeasts in body
     */
    @GetMapping("/mashbill-yeasts")
    @Timed
    public List<MashbillYeast> getAllMashbillYeasts() {
        log.debug("REST request to get all MashbillYeasts");
        return mashbillYeastRepository.findAll();
    }

    /**
     * GET  /mashbill-yeasts/:id : get the "id" mashbillYeast.
     *
     * @param id the id of the mashbillYeast to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mashbillYeast, or with status 404 (Not Found)
     */
    @GetMapping("/mashbill-yeasts/{id}")
    @Timed
    public ResponseEntity<MashbillYeast> getMashbillYeast(@PathVariable Long id) {
        log.debug("REST request to get MashbillYeast : {}", id);
        Optional<MashbillYeast> mashbillYeast = mashbillYeastRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mashbillYeast);
    }

    /**
        GET /mashbill-yeasts/mashbill: get all the yeasts belonging to a mashbill

        @return the stuff and things
    
     */
    @GetMapping("/mashbill-yeasts/mashbills/{id}")
    @Timed
    public List<MashbillYeast> getAllMashbillYeastsForMashbill(@PathVariable Long id){
        log.debug("REST request to get all mashbill yeasts for mashbill: {}",id);
        List<MashbillYeast> actions = mashbillYeastRepository.findByMashbillId(id);
        return actions;
    }

    /**
     * DELETE  /mashbill-yeasts/:id : delete the "id" mashbillYeast.
     *
     * @param id the id of the mashbillYeast to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mashbill-yeasts/{id}")
    @Timed
    public ResponseEntity<Void> deleteMashbillYeast(@PathVariable Long id) {
        log.debug("REST request to delete MashbillYeast : {}", id);

        mashbillYeastRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
