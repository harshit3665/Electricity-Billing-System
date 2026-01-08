package com.electricity.billing.dto;

public class UsageResponse {

    private double totalUnits;
    private double totalBill;

    public double getTotalUnits() { return totalUnits; }
    public void setTotalUnits(double totalUnits) { this.totalUnits = totalUnits; }

    public double getTotalBill() { return totalBill; }
    public void setTotalBill(double totalBill) { this.totalBill = totalBill; }
}
