package com.riverdale.splitwise.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "group")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "group")
    List<Expense> expenseList;

    public void addExpense(Expense expense) {
        if (expenseList == null) {
            expenseList = new ArrayList<>();
        }

        expenseList.add(expense);
        expense.setGroup(this);
    }

}
