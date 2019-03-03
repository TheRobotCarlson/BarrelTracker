package co.therobotcarlson.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.therobotcarlson.domain.Lot;
import co.therobotcarlson.repository.LotRepository;
import co.therobotcarlson.web.rest.errors.BadRequestAlertException;
import co.therobotcarlson.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Lot.
 */
@RestController
@RequestMapping("/api")
public class LotResource {

    private final Logger log = LoggerFactory.getLogger(LotResource.class);

    private static final String ENTITY_NAME = "lot";

    private final LotRepository lotRepository;

    public LotResource(LotRepository lotRepository) {
        this.lotRepository = lotRepository;
    }

    /**
     * POST  /lots : Create a new lot.
     *
     * @param lot the lot to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lot, or with status 400 (Bad Request) if the lot has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lots")
    @Timed
    public ResponseEntity<Lot> createLot(@RequestBody Lot lot) throws URISyntaxException {
        log.debug("REST request to save Lot : {}", lot);
        if (lot.getId() != null) {
            throw new BadRequestAlertException("A new lot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lot result = lotRepository.save(lot);
        return ResponseEntity.created(new URI("/api/lots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lots : Updates an existing lot.
     *
     * @param lot the lot to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lot,
     * or with status 400 (Bad Request) if the lot is not valid,
     * or with status 500 (Internal Server Error) if the lot couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lots")
    @Timed
    public ResponseEntity<Lot> updateLot(@RequestBody Lot lot) throws URISyntaxException {
        log.debug("REST request to update Lot : {}", lot);
        if (lot.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Lot result = lotRepository.save(lot);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lot.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lots : get all the lots.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of lots in body
     */
    @GetMapping("/lots")
    @Timed
    public List<Lot> getAllLots() {
        log.debug("REST request to get all Lots");
        return lotRepository.findAll();
    }

    /**
     * GET  /lots/:id : get the "id" lot.
     *
     * @param id the id of the lot to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lot, or with status 404 (Not Found)
     */
    @GetMapping("/lots/{id}")
    @Timed
    public ResponseEntity<Lot> getLot(@PathVariable Long id) {
        log.debug("REST request to get Lot : {}", id);
        Optional<Lot> lot = lotRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(lot);
    }

    /**
     * DELETE  /lots/:id : delete the "id" lot.
     *
     * @param id the id of the lot to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lots/{id}")
    @Timed
    public ResponseEntity<Void> deleteLot(@PathVariable Long id) {
        log.debug("REST request to delete Lot : {}", id);

        lotRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
