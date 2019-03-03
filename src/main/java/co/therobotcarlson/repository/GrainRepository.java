package co.therobotcarlson.repository;

import co.therobotcarlson.domain.Grain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Grain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GrainRepository extends JpaRepository<Grain, Long> {

}
