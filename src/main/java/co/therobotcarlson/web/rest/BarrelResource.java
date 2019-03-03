package co.therobotcarlson.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.therobotcarlson.domain.Barrel;
import co.therobotcarlson.repository.BarrelRepository;
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
 * REST controller for managing Barrel.
 */
@RestController
@RequestMapping("/api")
public class BarrelResource {

    private final Logger log = LoggerFactory.getLogger(BarrelResource.class);

    private static final String ENTITY_NAME = "barrel";

    private final BarrelRepository barrelRepository;

    public BarrelResource(BarrelRepository barrelRepository) {
        this.barrelRepository = barrelRepository;
    }

    /**
     * POST  /barrels : Create a new barrel.
     *
     * @param barrel the barrel to create
     * @return the ResponseEntity with status 201 (Created) and with body the new barrel, or with status 400 (Bad Request) if the barrel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/barrels")
    @Timed
    public ResponseEntity<Barrel> createBarrel(@RequestBody Barrel barrel) throws URISyntaxException {
        log.debug("REST request to save Barrel : {}", barrel);
        if (barrel.getId() != null) {
            throw new BadRequestAlertException("A new barrel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Barrel result = barrelRepository.save(barrel);
        return ResponseEntity.created(new URI("/api/barrels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /barrels : Updates an existing barrel.
     *
     * @param barrel the barrel to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated barrel,
     * or with status 400 (Bad Request) if the barrel is not valid,
     * or with status 500 (Internal Server Error) if the barrel couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/barrels")
    @Timed
    public ResponseEntity<Barrel> updateBarrel(@RequestBody Barrel barrel) throws URISyntaxException {
        log.debug("REST request to update Barrel : {}", barrel);
        if (barrel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Barrel result = barrelRepository.save(barrel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, barrel.getId().toString()))
            .body(result);
    }

    /**
     * GET  /barrels : get all the barrels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of barrels in body
     */
    @GetMapping("/barrels")
    @Timed
    public List<Barrel> getAllBarrels() {
        log.debug("REST request to get all Barrels");
        return barrelRepository.findAll();
    }

    /**
     * GET  /barrels/:id : get the "id" barrel.
     *
     * @param id the id of the barrel to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the barrel, or with status 404 (Not Found)
     */
    @GetMapping("/barrels/{id}")
    @Timed
    public ResponseEntity<Barrel> getBarrel(@PathVariable Long id) {
        log.debug("REST request to get Barrel : {}", id);
        Optional<Barrel> barrel = barrelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(barrel);
    }

    /**
     * DELETE  /barrels/:id : delete the "id" barrel.
     *
     * @param id the id of the barrel to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/barrels/{id}")
    @Timed
    public ResponseEntity<Void> deleteBarrel(@PathVariable Long id) {
        log.debug("REST request to delete Barrel : {}", id);

        barrelRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
