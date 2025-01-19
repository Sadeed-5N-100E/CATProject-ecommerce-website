package com.example.servlet;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.LinkedHashMap;

@WebServlet("/PaymentServlet")
public class PaymentServlet extends HttpServlet {

    private static final String TRANSACTION_FILE = "C:\\Users\\Jack\\Documents\\CAT201\\Project2\\CATProject-ecommerce-website\\ProjectBackend\\src\\main\\webapp\\data\\Transaction.json"; // Relative path

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            StringBuilder sb = new StringBuilder();
            String line;
            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }

            JSONObject paymentData = new JSONObject(sb.toString());

            // Log received data
            System.out.println("Received payment data: " + sb.toString());

            // Extract values safely
            String firstName = paymentData.optString("firstName", null);
            String lastName = paymentData.optString("lastName", null);
            String selectedCard = paymentData.optString("selectedCard", null);
            String cardNumber = paymentData.optString("cardNumber", null);
            String expiryDate = paymentData.optString("expiryDate", null);
            String cvv = paymentData.optString("cvv", null);
            double totalPrice = paymentData.optDouble("totalPrice", -1);

            // Check for null values
            if (firstName == null || lastName == null || selectedCard == null || cardNumber == null || expiryDate == null || cvv == null || totalPrice < 0) {
                throw new Exception("One or more required fields are missing or invalid.");
            }

            // Write transaction data to JSON file
            writeTransaction(firstName, lastName, selectedCard, cardNumber, expiryDate, cvv, totalPrice);

            // Respond with success
            response.getWriter().write("{\"status\":\"success\"}");
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\", \"message\":\"" + e.getMessage() + "\"}");
        }
    }

    private void writeTransaction(String firstName, String lastName, String selectedCard, String cardNumber, String expiryDate, String cvv, double totalPrice) throws IOException {
        // Read existing transactions
        JSONObject existingData;
        JSONArray transactions;

        try {
            existingData = new JSONObject();
            transactions = new JSONArray();

            // Read the existing file if it exists
            File file = new File(TRANSACTION_FILE);
            if (file.exists()) {
                try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                    StringBuilder jsonContent = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) {
                        jsonContent.append(line);
                    }
                    existingData = new JSONObject(jsonContent.toString());
                    transactions = existingData.optJSONArray("transaction");
                }
            }

            // If the transactions array is null, create a new one
            if (transactions == null) {
                transactions = new JSONArray();
            }

            // Create a new transaction object using LinkedHashMap to maintain order
            LinkedHashMap<String, Object> transactionMap = new LinkedHashMap<>();
            transactionMap.put("firstName", firstName);
            transactionMap.put("lastName", lastName);
            transactionMap.put("cardType", selectedCard);
            transactionMap.put("cardNumber", cardNumber);
            transactionMap.put("expiryDate", expiryDate);
            transactionMap.put("cvv", cvv);
            transactionMap.put("totalPrice", totalPrice);

            // Convert LinkedHashMap to JSONObject
            JSONObject newTransaction = new JSONObject(transactionMap);

            // Add the new transaction to the array
            transactions.put(newTransaction);

            // Write the updated JSON back to the file
            existingData.put("transaction", transactions);
            try (FileWriter fileWriter = new FileWriter(TRANSACTION_FILE)) {
                fileWriter.write(existingData.toString(4)); // Pretty print with an indent of 4 spaces
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw e; // Rethrow the exception for further handling
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    try {
        // Read the content of the Users.json file
        File usersFile = new File(getServletContext().getRealPath("/data/Transaction.json"));
        StringBuilder usersContent = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new FileReader(usersFile))) {
            String line;
            while ((line = br.readLine()) != null) {
                usersContent.append(line).append("\n");
            }
        }
        // Write the content to the response
        response.setContentType("application/json");
        response.getWriter().write(usersContent.toString());
    } catch (IOException e) {
        e.printStackTrace(); // Log the exception
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        response.getWriter().write("{\"status\":\"error\", \"message\":\"Unable to read Users.json\"}");
    }
    }

}
