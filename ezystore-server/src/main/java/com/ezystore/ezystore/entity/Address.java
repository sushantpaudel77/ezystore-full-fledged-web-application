package com.ezystore.ezystore.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Entity
@Table(name = "address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "customer")
public class Address extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id", nullable = false, updatable = false)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false, unique = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Customer customer;

    @NotBlank
    @Size(max = 150)
    @Column(name = "street", nullable = false, length = 150)
    private String street;

    @NotBlank
    @Size(max = 100)
    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @NotBlank
    @Size(max = 100)
    @Column(name = "state", nullable = false, length = 100)
    private String state;

    @NotBlank
    @Size(max = 20)
    @Column(name = "postal_code", nullable = false, length = 20)
    private String postalCode;

    @NotBlank
    @Size(max = 100)
    @Column(name = "country", nullable = false, length = 100)
    private String country;
}
