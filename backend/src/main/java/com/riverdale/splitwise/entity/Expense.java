package com.riverdale.splitwise.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "expense")
public class Expense {

    private int id;

    private String name;

    private int amount;

    private String paidBy;

    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.PERSIST, CascadeType.DETACH, CascadeType.MERGE})
    @JoinColumn(name = "group_id")
    private Group group;

}
