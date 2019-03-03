package co.therobotcarlson.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Mashbill.
 */
@Entity
@Table(name = "mashbill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mashbill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "mashbill_name", nullable = false)
    private String mashbillName;

    @NotNull
    @Column(name = "mashbill_code", nullable = false)
    private String mashbillCode;

    @Column(name = "mashbill_notes")
    private String mashbillNotes;

    @OneToMany(mappedBy = "mashbill")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MashbillGrain> mashbillGrains = new HashSet<>();

    @OneToMany(mappedBy = "mashbill")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MashbillYeast> mashbillYeasts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMashbillName() {
        return mashbillName;
    }

    public Mashbill mashbillName(String mashbillName) {
        this.mashbillName = mashbillName;
        return this;
    }

    public void setMashbillName(String mashbillName) {
        this.mashbillName = mashbillName;
    }

    public String getMashbillCode() {
        return mashbillCode;
    }

    public Mashbill mashbillCode(String mashbillCode) {
        this.mashbillCode = mashbillCode;
        return this;
    }

    public void setMashbillCode(String mashbillCode) {
        this.mashbillCode = mashbillCode;
    }

    public String getMashbillNotes() {
        return mashbillNotes;
    }

    public Mashbill mashbillNotes(String mashbillNotes) {
        this.mashbillNotes = mashbillNotes;
        return this;
    }

    public void setMashbillNotes(String mashbillNotes) {
        this.mashbillNotes = mashbillNotes;
    }

    public Set<MashbillGrain> getMashbillGrains() {
        return mashbillGrains;
    }

    public Mashbill mashbillGrains(Set<MashbillGrain> mashbillGrains) {
        this.mashbillGrains = mashbillGrains;
        return this;
    }

    public Mashbill addMashbillGrain(MashbillGrain mashbillGrain) {
        this.mashbillGrains.add(mashbillGrain);
        mashbillGrain.setMashbill(this);
        return this;
    }

    public Mashbill removeMashbillGrain(MashbillGrain mashbillGrain) {
        this.mashbillGrains.remove(mashbillGrain);
        mashbillGrain.setMashbill(null);
        return this;
    }

    public void setMashbillGrains(Set<MashbillGrain> mashbillGrains) {
        this.mashbillGrains = mashbillGrains;
    }

    public Set<MashbillYeast> getMashbillYeasts() {
        return mashbillYeasts;
    }

    public Mashbill mashbillYeasts(Set<MashbillYeast> mashbillYeasts) {
        this.mashbillYeasts = mashbillYeasts;
        return this;
    }

    public Mashbill addMashbillYeast(MashbillYeast mashbillYeast) {
        this.mashbillYeasts.add(mashbillYeast);
        mashbillYeast.setMashbill(this);
        return this;
    }

    public Mashbill removeMashbillYeast(MashbillYeast mashbillYeast) {
        this.mashbillYeasts.remove(mashbillYeast);
        mashbillYeast.setMashbill(null);
        return this;
    }

    public void setMashbillYeasts(Set<MashbillYeast> mashbillYeasts) {
        this.mashbillYeasts = mashbillYeasts;
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
        Mashbill mashbill = (Mashbill) o;
        if (mashbill.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mashbill.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mashbill{" +
            "id=" + getId() +
            ", mashbillName='" + getMashbillName() + "'" +
            ", mashbillCode='" + getMashbillCode() + "'" +
            ", mashbillNotes='" + getMashbillNotes() + "'" +
            "}";
    }
}
