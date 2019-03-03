package co.therobotcarlson.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Lot.
 */
@Entity
@Table(name = "lot")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "barrel_capacity")
    private Integer barrelCapacity;

    @Column(name = "lot_name")
    private String lotName;

    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "lot")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Barrel> barrels = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBarrelCapacity() {
        return barrelCapacity;
    }

    public Lot barrelCapacity(Integer barrelCapacity) {
        this.barrelCapacity = barrelCapacity;
        return this;
    }

    public void setBarrelCapacity(Integer barrelCapacity) {
        this.barrelCapacity = barrelCapacity;
    }

    public String getLotName() {
        return lotName;
    }

    public Lot lotName(String lotName) {
        this.lotName = lotName;
        return this;
    }

    public void setLotName(String lotName) {
        this.lotName = lotName;
    }

    public String getLocation() {
        return location;
    }

    public Lot location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Set<Barrel> getBarrels() {
        return barrels;
    }

    public Lot barrels(Set<Barrel> barrels) {
        this.barrels = barrels;
        return this;
    }

    public Lot addBarrel(Barrel barrel) {
        this.barrels.add(barrel);
        barrel.setLot(this);
        return this;
    }

    public Lot removeBarrel(Barrel barrel) {
        this.barrels.remove(barrel);
        barrel.setLot(null);
        return this;
    }

    public void setBarrels(Set<Barrel> barrels) {
        this.barrels = barrels;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Lot lot = (Lot) o;
        if (lot.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lot.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Lot{" +
            "id=" + getId() +
            ", barrelCapacity=" + getBarrelCapacity() +
            ", lotName='" + getLotName() + "'" +
            ", location='" + getLocation() + "'" +
            "}";
    }
}
