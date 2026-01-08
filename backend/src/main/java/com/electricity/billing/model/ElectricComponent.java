package com.electricity.billing.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "electric_components")
public class ElectricComponent {

    @Id
    private String id;
    private String name;
    private int watt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getWatt() { return watt; }
    public void setWatt(int watt) { this.watt = watt; }
}
