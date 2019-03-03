package co.therobotcarlson.repository;

import co.therobotcarlson.domain.MashbillYeast;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MashbillYeast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MashbillYeastRepository extends JpaRepository<MashbillYeast, Long> {

}
