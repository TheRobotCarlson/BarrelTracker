package co.therobotcarlson.repository;

import co.therobotcarlson.domain.Batch;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Batch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {

}
