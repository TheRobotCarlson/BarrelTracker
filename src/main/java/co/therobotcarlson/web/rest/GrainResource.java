package co.therobotcarlson.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.therobotcarlson.domain.Grain;
import co.therobotcarlson.repository.GrainRepository;
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
 * REST controller for managing Grain.
 */
@RestController
@RequestMapping("/api")
public class GrainResource {

    private final Logger log = LoggerFactory.getLogger(GrainResource.class);

    private static final String ENTITY_NAME = "grain";

    private final GrainRepository grainRepository;

    public GrainResource(GrainRepository grainRepository) {
        this.grainRepository = grainRepository;
    }

    /**
     * POST  /grains : Create a new grain.
     *
     * @param grain the grain to create
     * @return the ResponseEntity with status 201 (Created) and with body the new grain, or with status 400 (Bad Request) if the grain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/grains")
    @Timed
    public ResponseEntity<Grain> createGrain(@Valid @RequestBody Grain grain) throws URISyntaxException {
        log.debug("REST request to save Grain : {}", grain);
        if (grain.getId() != null) {
            throw new BadRequestAlertException("A new grain cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Grain result = grainRepository.save(grain);
        return ResponseEntity.created(new URI("/api/grains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /grains : Updates an existing grain.
     *
     * @param grain the grain to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated grain,
     * or with status 400 (Bad Request) if the grain is not valid,
     * or with status 500 (Internal Server Error) if the grain couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/grains")
    @Timed
    public ResponseEntity<Grain> updateGrain(@Valid @RequestBody Grain grain) throws URISyntaxException {
        log.debug("REST request to update Grain : {}", grain);
        if (grain.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Grain result = grainRepository.save(grain);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, grain.getId().toString()))
            .body(result);
    }

    /**
     * GET  /grains : get all the grains.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of grains in body
     */
    @GetMapping("/grains")
    @Timed
    public List<Grain> getAllGrains() {
        log.debug("REST request to get all Grains");
        return grainRepository.findAll();
    }

    /**
     * GET  /grains/:id : get the "id" grain.
     *
     * @param id the id of the grain to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the grain, or with status 404 (Not Found)
     */
    @GetMapping("/grains/{id}")
    @Timed
    public ResponseEntity<Grain> getGrain(@PathVariable Long id) {
        log.debug("REST request to get Grain : {}", id);
        Optional<Grain> grain = grainRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(grain);
    }

    /**
     * DELETE  /grains/:id : delete the "id" grain.
     *
     * @param id the id of the grain to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/grains/{id}")
    @Timed
    public ResponseEntity<Void> deleteGrain(@PathVariable Long id) {
        log.debug("REST request to delete Grain : {}", id);

        grainRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
