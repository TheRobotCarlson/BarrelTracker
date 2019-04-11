package co.therobotcarlson.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.therobotcarlson.domain.Mashbill;
import co.therobotcarlson.repository.MashbillRepository;
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
 * REST controller for managing Mashbill.
 */
@RestController
@RequestMapping("/api")
public class MashbillResource {

    private final Logger log = LoggerFactory.getLogger(MashbillResource.class);

    private static final String ENTITY_NAME = "mashbill";

    private final MashbillRepository mashbillRepository;

    public MashbillResource(MashbillRepository mashbillRepository) {
        this.mashbillRepository = mashbillRepository;
    }

    /**
     * POST  /mashbills : Create a new mashbill.
     *
     * @param mashbill the mashbill to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mashbill, or with status 400 (Bad Request) if the mashbill has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mashbills")
    @Timed
    public ResponseEntity<Mashbill> createMashbill(@Valid @RequestBody Mashbill mashbill) throws URISyntaxException {
        log.debug("REST request to save Mashbill : {}", mashbill);
        if (mashbill.getId() != null) {
            throw new BadRequestAlertException("A new mashbill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mashbill result = mashbillRepository.save(mashbill);
        return ResponseEntity.created(new URI("/api/mashbills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mashbills : Updates an existing mashbill.
     *
     * @param mashbill the mashbill to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mashbill,
     * or with status 400 (Bad Request) if the mashbill is not valid,
     * or with status 500 (Internal Server Error) if the mashbill couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mashbills")
    @Timed
    public ResponseEntity<Mashbill> updateMashbill(@Valid @RequestBody Mashbill mashbill) throws URISyntaxException {
        log.debug("REST request to update Mashbill : {}", mashbill);
        if (mashbill.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Mashbill result = mashbillRepository.save(mashbill);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mashbill.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mashbills : get all the mashbills.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mashbills in body
     */
    @GetMapping("/mashbills")
    @Timed
    public List<Mashbill> getAllMashbills() {
        log.debug("REST request to get all Mashbills");
        return mashbillRepository.findAll();
    }

    /**
     * GET  /mashbills/:id : get the "id" mashbill.
     *
     * @param id the id of the mashbill to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mashbill, or with status 404 (Not Found)
     */
    @GetMapping("/mashbills/{id}")
    @Timed
    public ResponseEntity<Mashbill> getMashbill(@PathVariable Long id) {
        log.debug("REST request to get Mashbill : {}", id);
        Optional<Mashbill> mashbill = mashbillRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mashbill);
        // Mashbill mb = mashbillRepository.findById(id);
        // return mb;
    }

    
    /**
     * GET  /mashbills/:name : get the "name" mashbill.
     *
     * @param id the id of the mashbill to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mashbill, or with status 404 (Not Found)
     */
    @GetMapping("/mashbills/byName/{name}")
    @Timed
    public Mashbill getMashbillByName(@PathVariable String name){
        log.debug("REST request to get Mashbill : {}", name);
        Mashbill mashbill = mashbillRepository.findByMashbillName(name);
        return mashbill;
    }

    /**
     * DELETE  /mashbills/:id : delete the "id" mashbill.
     *
     * @param id the id of the mashbill to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mashbills/{id}")
    @Timed
    public ResponseEntity<Void> deleteMashbill(@PathVariable Long id) {
        log.debug("REST request to delete Mashbill : {}", id);

        mashbillRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
