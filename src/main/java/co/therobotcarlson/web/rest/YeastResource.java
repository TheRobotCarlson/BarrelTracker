package co.therobotcarlson.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.therobotcarlson.domain.Yeast;
import co.therobotcarlson.repository.YeastRepository;
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
 * REST controller for managing Yeast.
 */
@RestController
@RequestMapping("/api")
public class YeastResource {

    private final Logger log = LoggerFactory.getLogger(YeastResource.class);

    private static final String ENTITY_NAME = "yeast";

    private final YeastRepository yeastRepository;

    public YeastResource(YeastRepository yeastRepository) {
        this.yeastRepository = yeastRepository;
    }

    /**
     * POST  /yeasts : Create a new yeast.
     *
     * @param yeast the yeast to create
     * @return the ResponseEntity with status 201 (Created) and with body the new yeast, or with status 400 (Bad Request) if the yeast has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/yeasts")
    @Timed
    public ResponseEntity<Yeast> createYeast(@Valid @RequestBody Yeast yeast) throws URISyntaxException {
        log.debug("REST request to save Yeast : {}", yeast);
        if (yeast.getId() != null) {
            throw new BadRequestAlertException("A new yeast cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Yeast result = yeastRepository.save(yeast);
        return ResponseEntity.created(new URI("/api/yeasts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /yeasts : Updates an existing yeast.
     *
     * @param yeast the yeast to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated yeast,
     * or with status 400 (Bad Request) if the yeast is not valid,
     * or with status 500 (Internal Server Error) if the yeast couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/yeasts")
    @Timed
    public ResponseEntity<Yeast> updateYeast(@Valid @RequestBody Yeast yeast) throws URISyntaxException {
        log.debug("REST request to update Yeast : {}", yeast);
        if (yeast.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Yeast result = yeastRepository.save(yeast);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, yeast.getId().toString()))
            .body(result);
    }

    /**
     * GET  /yeasts : get all the yeasts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of yeasts in body
     */
    @GetMapping("/yeasts")
    @Timed
    public List<Yeast> getAllYeasts() {
        log.debug("REST request to get all Yeasts");
        return yeastRepository.findAll();
    }

    /**
     * GET  /yeasts/:id : get the "id" yeast.
     *
     * @param id the id of the yeast to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the yeast, or with status 404 (Not Found)
     */
    @GetMapping("/yeasts/{id}")
    @Timed
    public ResponseEntity<Yeast> getYeast(@PathVariable Long id) {
        log.debug("REST request to get Yeast : {}", id);
        Optional<Yeast> yeast = yeastRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(yeast);
    }

    /**
     * DELETE  /yeasts/:id : delete the "id" yeast.
     *
     * @param id the id of the yeast to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/yeasts/{id}")
    @Timed
    public ResponseEntity<Void> deleteYeast(@PathVariable Long id) {
        log.debug("REST request to delete Yeast : {}", id);

        yeastRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
