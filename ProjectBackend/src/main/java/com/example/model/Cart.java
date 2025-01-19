package com.example.model;

import java.util.HashMap;
import java.util.Map;

public class Cart {
    private Map<String, Integer> items; // Product ID and quantity

    public Cart() {
        items = new HashMap<>();
    }

    public boolean addItem(String productId, int quantity) {
        if (quantity <= 0) {
            return false; // Invalid quantity
        }
        items.put(productId, items.getOrDefault(productId, 0) + quantity);
        return true;
    }

    // Additional methods like removeItem, getItems, etc. can be added here
} 