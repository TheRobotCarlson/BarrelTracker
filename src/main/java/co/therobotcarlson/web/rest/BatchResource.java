package co.therobotcarlson.web.rest;

import com.codahale.metrics.annotation.Timed;
import co.therobotcarlson.domain.Batch;
import co.therobotcarlson.repository.BatchRepository;
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
 * REST controller for managing Batch.
 */
@RestController
@RequestMapping("/api")
public class BatchResource {

    private final Logger log = LoggerFactory.getLogger(BatchResource.class);

    private static final String ENTITY_NAME = "batch";

    private final BatchRepository batchRepository;

    public BatchResource(BatchRepository batchRepository) {
        this.batchRepository = batchRepository;
    }

    /**
     * POST  /batches : Create a new batch.
     *
     * @param batch the batch to create
     * @return the ResponseEntity with status 201 (Created) and with body the new batch, or with status 400 (Bad Request) if the batch has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/batches")
    @Timed
    public ResponseEntity<Batch> createBatch(@Valid @RequestBody Batch batch) throws URISyntaxException {
        log.debug("REST request to save Batch : {}", batch);
        if (batch.getId() != null) {
            throw new BadRequestAlertException("A new batch cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Batch result = batchRepository.save(batch);
        return ResponseEntity.created(new URI("/api/batches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /batches : Updates an existing batch.
     *
     * @param batch the batch to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated batch,
     * or with status 400 (Bad Request) if the batch is not valid,
     * or with status 500 (Internal Server Error) if the batch couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/batches")
    @Timed
    public ResponseEntity<Batch> updateBatch(@Valid @RequestBody Batch batch) throws URISyntaxException {
        log.debug("REST request to update Batch : {}", batch);
        if (batch.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Batch result = batchRepository.save(batch);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, batch.getId().toString()))
            .body(result);
    }

    /**
     * GET  /batches : get all the batches.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of batches in body
     */
    @GetMapping("/batches")
    @Timed
    public List<Batch> getAllBatches() {
        log.debug("REST request to get all Batches");
        return batchRepository.findAll();
    }

    /**
     * GET  /batches/:id : get the "id" batch.
     *
     * @param id the id of the batch to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the batch, or with status 404 (Not Found)
     */
    @GetMapping("/batches/{id}")
    @Timed
    public ResponseEntity<Batch> getBatch(@PathVariable Long id) {
        log.debug("REST request to get Batch : {}", id);
        Optional<Batch> batch = batchRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(batch);
    }

    /**
     * DELETE  /batches/:id : delete the "id" batch.
     *
     * @param id the id of the batch to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/batches/{id}")
    @Timed
    public ResponseEntity<Void> deleteBatch(@PathVariable Long id) {
        log.debug("REST request to delete Batch : {}", id);

        batchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
