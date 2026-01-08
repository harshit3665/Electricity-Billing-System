package com.electricity.billing.dto;

import java.util.Map;

public class UsageRequest {

    private String username;
    private String month;
    private int year;
    private Map<String, Integer> hoursPerDay;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public Map<String, Integer> getHoursPerDay() { return hoursPerDay; }
    public void setHoursPerDay(Map<String, Integer> hoursPerDay) {
        this.hoursPerDay = hoursPerDay;
    }
}
