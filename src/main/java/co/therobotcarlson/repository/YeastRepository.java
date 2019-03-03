package co.therobotcarlson.repository;

import co.therobotcarlson.domain.Yeast;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Yeast entity.
 */
@SuppressWarnings("unused")
@Repository
public interface YeastRepository extends JpaRepository<Yeast, Long> {

}
