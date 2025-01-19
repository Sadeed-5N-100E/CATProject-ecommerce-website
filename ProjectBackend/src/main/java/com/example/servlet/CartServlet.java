package com.example.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

@WebServlet("/CartServlet")
public class CartServlet extends HttpServlet {
    private static final String CART_FILE = "C:\\Users\\Jack\\Documents\\CAT201\\Project2\\CATProject-ecommerce-website\\ProjectBackend\\src\\main\\webapp\\data\\Cart.json";

    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        PrintWriter out = response.getWriter();

        try {
            JSONArray cartItems = readCartItems();
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("cart", cartItems);
            out.print(jsonResponse.toString());
        } catch (Exception e) {
            handleError(response, e);
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        try {
            // Read request body
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }

            // Parse the request
            JSONObject requestData = new JSONObject(sb.toString());
            String action = requestData.getString("action");

            JSONArray cartItems = readCartItems();
            JSONObject jsonResponse = new JSONObject();

            switch (action) {
                case "add":
                    cartItems.put(requestData.getJSONObject("item"));
                    writeCartItems(cartItems);
                    jsonResponse.put("status", "success");
                    jsonResponse.put("message", "Item added to cart");
                    break;
                    
                case "update":
                    int itemId = requestData.getInt("itemId");
                    int newQuantity = requestData.getInt("quantity");
                    updateItemQuantity(cartItems, itemId, newQuantity);
                    writeCartItems(cartItems);
                    jsonResponse.put("status", "success");
                    jsonResponse.put("message", "Cart updated");
                    break;

                case "remove":
                    itemId = requestData.getInt("itemId");
                    removeItem(cartItems, itemId);
                    writeCartItems(cartItems);
                    jsonResponse.put("status", "success");
                    jsonResponse.put("message", "Item removed from cart");
                    break;
            }
            
            response.getWriter().write(jsonResponse.toString());
        } catch (Exception e) {
            handleError(response, e);
        }
    }

    private JSONArray readCartItems() throws IOException {
        File file = new File(CART_FILE);
        if (!file.exists()) {
            return new JSONArray();
        }
        
        FileReader reader = new FileReader(file);
        JSONTokener tokener = new JSONTokener(reader);
        JSONObject cartData = new JSONObject(tokener);
        reader.close();
        return cartData.getJSONArray("cart");
    }

    private void writeCartItems(JSONArray cartItems) throws IOException {
        JSONObject cartData = new JSONObject();
        cartData.put("cart", cartItems);
        FileWriter writer = new FileWriter(CART_FILE);
        writer.write(cartData.toString(4));
        writer.close();
    }

    private void updateItemQuantity(JSONArray cartItems, int itemId, int newQuantity) {
        for (int i = 0; i < cartItems.length(); i++) {
            JSONObject item = cartItems.getJSONObject(i);
            if (item.getInt("id") == itemId) {
                item.put("quantity", newQuantity);
                break;
            }
        }
    }

    private void removeItem(JSONArray cartItems, int itemId) {
        for (int i = 0; i < cartItems.length(); i++) {
            if (cartItems.getJSONObject(i).getInt("id") == itemId) {
                cartItems.remove(i);
                break;
            }
        }
    }

    private void handleError(HttpServletResponse response, Exception e) throws IOException {
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("message", e.getMessage());
        jsonResponse.put("status", "error");
        out.print(jsonResponse.toString());
    }
}
