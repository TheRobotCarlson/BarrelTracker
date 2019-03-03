package co.therobotcarlson.repository;

import co.therobotcarlson.domain.Barrel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Barrel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BarrelRepository extends JpaRepository<Barrel, Long> {

}
