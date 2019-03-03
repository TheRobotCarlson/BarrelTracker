package co.therobotcarlson.repository;

import co.therobotcarlson.domain.MashbillGrain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MashbillGrain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MashbillGrainRepository extends JpaRepository<MashbillGrain, Long> {

}
