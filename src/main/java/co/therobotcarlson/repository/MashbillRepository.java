package co.therobotcarlson.repository;

import co.therobotcarlson.domain.Mashbill;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Mashbill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MashbillRepository extends JpaRepository<Mashbill, Long> {
    Mashbill findByMashbillName(String name);
}
