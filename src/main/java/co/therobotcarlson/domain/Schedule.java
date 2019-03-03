package co.therobotcarlson.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Schedule.
 */
@Entity
@Table(name = "schedule")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Schedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "target_barrel_quantity")
    private Integer targetBarrelQuantity;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @OneToMany(mappedBy = "schedule")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Batch> batches = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private Mashbill mashbill;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTargetBarrelQuantity() {
        return targetBarrelQuantity;
    }

    public Schedule targetBarrelQuantity(Integer targetBarrelQuantity) {
        this.targetBarrelQuantity = targetBarrelQuantity;
        return this;
    }

    public void setTargetBarrelQuantity(Integer targetBarrelQuantity) {
        this.targetBarrelQuantity = targetBarrelQuantity;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Schedule date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Set<Batch> getBatches() {
        return batches;
    }

    public Schedule batches(Set<Batch> batches) {
        this.batches = batches;
        return this;
    }

    public Schedule addBatch(Batch batch) {
        this.batches.add(batch);
        batch.setSchedule(this);
        return this;
    }

    public Schedule removeBatch(Batch batch) {
        this.batches.remove(batch);
        batch.setSchedule(null);
        return this;
    }

    public void setBatches(Set<Batch> batches) {
        this.batches = batches;
    }

    public Mashbill getMashbill() {
        return mashbill;
    }

    public Schedule mashbill(Mashbill mashbill) {
        this.mashbill = mashbill;
        return this;
    }

    public void setMashbill(Mashbill mashbill) {
        this.mashbill = mashbill;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Schedule customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
        Schedule schedule = (Schedule) o;
        if (schedule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schedule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Schedule{" +
            "id=" + getId() +
            ", targetBarrelQuantity=" + getTargetBarrelQuantity() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
