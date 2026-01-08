package com.electricity.billing.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Map;

@Document(collection = "monthly_usage")
public class MonthlyUsage {

    @Id
    private String id;

    private String username;
    private String month;
    private int year;

    // applianceName -> units
    private Map<String, Double> applianceUnits;

    private double totalUnits;
    private double totalBill;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public Map<String, Double> getApplianceUnits() { return applianceUnits; }
    public void setApplianceUnits(Map<String, Double> applianceUnits) {
        this.applianceUnits = applianceUnits;
    }

    public double getTotalUnits() { return totalUnits; }
    public void setTotalUnits(double totalUnits) { this.totalUnits = totalUnits; }

    public double getTotalBill() { return totalBill; }
    public void setTotalBill(double totalBill) { this.totalBill = totalBill; }
}
