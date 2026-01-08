package com.electricity.billing.service;

import org.springframework.stereotype.Service;

@Service
public class BillingService {

    public double calculateUnits(int watt, int hours, int days, int quantity) {
        return (watt * hours * days * quantity) / 1000.0;
    }

    public double calculateBill(double units, double rate) {
        return units * rate;
    }
}
