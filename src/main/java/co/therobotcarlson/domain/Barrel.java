package co.therobotcarlson.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Barrel.
 */
@Entity
@Table(name = "barrel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Barrel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("barrels")
    private Lot lot;

    @ManyToOne
    @JsonIgnoreProperties("barrels")
    private Customer customer;

    @ManyToOne
    @JsonIgnoreProperties("barrels")
    private Batch batch;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Lot getLot() {
        return lot;
    }

    public Barrel lot(Lot lot) {
        this.lot = lot;
        return this;
    }

    public void setLot(Lot lot) {
        this.lot = lot;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Barrel customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Batch getBatch() {
        return batch;
    }

    public Barrel batch(Batch batch) {
        this.batch = batch;
        return this;
    }

    public void setBatch(Batch batch) {
        this.batch = batch;
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
        Barrel barrel = (Barrel) o;
        if (barrel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), barrel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Barrel{" +
            "id=" + getId() +
            "}";
    }
}
