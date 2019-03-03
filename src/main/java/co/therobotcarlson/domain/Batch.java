package co.therobotcarlson.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Batch.
 */
@Entity
@Table(name = "batch")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Batch implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "proof", nullable = false)
    private Integer proof;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private ZonedDateTime date;

    @NotNull
    @Column(name = "batch_name", nullable = false)
    private String batchName;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Mashbill mashbill;

    @OneToMany(mappedBy = "batch")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Barrel> barrels = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("batches")
    private Schedule schedule;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getProof() {
        return proof;
    }

    public Batch proof(Integer proof) {
        this.proof = proof;
        return this;
    }

    public void setProof(Integer proof) {
        this.proof = proof;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Batch date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getBatchName() {
        return batchName;
    }

    public Batch batchName(String batchName) {
        this.batchName = batchName;
        return this;
    }

    public void setBatchName(String batchName) {
        this.batchName = batchName;
    }

    public Mashbill getMashbill() {
        return mashbill;
    }

    public Batch mashbill(Mashbill mashbill) {
        this.mashbill = mashbill;
        return this;
    }

    public void setMashbill(Mashbill mashbill) {
        this.mashbill = mashbill;
    }

    public Set<Barrel> getBarrels() {
        return barrels;
    }

    public Batch barrels(Set<Barrel> barrels) {
        this.barrels = barrels;
        return this;
    }

    public Batch addBarrel(Barrel barrel) {
        this.barrels.add(barrel);
        barrel.setBatch(this);
        return this;
    }

    public Batch removeBarrel(Barrel barrel) {
        this.barrels.remove(barrel);
        barrel.setBatch(null);
        return this;
    }

    public void setBarrels(Set<Barrel> barrels) {
        this.barrels = barrels;
    }

    public Schedule getSchedule() {
        return schedule;
    }

    public Batch schedule(Schedule schedule) {
        this.schedule = schedule;
        return this;
    }

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
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
        Batch batch = (Batch) o;
        if (batch.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), batch.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Batch{" +
            "id=" + getId() +
            ", proof=" + getProof() +
            ", date='" + getDate() + "'" +
            ", batchName='" + getBatchName() + "'" +
            "}";
    }
}
