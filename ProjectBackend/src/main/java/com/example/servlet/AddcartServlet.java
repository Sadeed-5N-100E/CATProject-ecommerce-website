package com.example.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet("/AddcartServlet")
public class AddcartServlet extends HttpServlet {

    private static final String CART_FILE = "C:\\Users\\Jack\\Documents\\CAT201\\Project2\\CATProject-ecommerce-website\\ProjectBackend\\src\\main\\webapp\\data\\Cart.json"; // Update this path

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        StringBuilder sb = new StringBuilder();
        String line;
        BufferedReader reader = request.getReader();
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }

        PrintWriter out = response.getWriter();
        try {
            JSONObject cartData = new JSONObject(sb.toString());
            String productId = cartData.getString("id");
            String name = cartData.getString("name");
            String brand = cartData.getString("brand");
            String category = cartData.getString("category");
            double price = cartData.getDouble("price");
            String image = cartData.getString("image");
            int quantity = cartData.getInt("quantity");

            // Create a new cart item object
            JSONObject newCartItem = new JSONObject();
            newCartItem.put("id", productId);
            newCartItem.put("name", name);
            newCartItem.put("brand", brand);
            newCartItem.put("category", category);
            newCartItem.put("price", price);
            newCartItem.put("image", image);
            newCartItem.put("quantity", quantity);

            // Write to cart.json
            writeToCartJson(newCartItem, out);
            
            response.setContentType("application/json");
            out.write("{\"message\":\"Item added to cart successfully.\"}");
        } catch (Exception e) {
            e.printStackTrace(); // Log the error for debugging
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            out.write("{\"message\":\"Failed to add item to cart.\"}");
        } finally {
            out.flush();
            out.close();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.getWriter().write("{\"message\":\"Item added to cart successfully.\"}");
    }

    private void writeToCartJson(JSONObject newCartItem, PrintWriter out) throws IOException {
        JSONArray cartItems = readCartItems(); // Read existing items
        cartItems.put(newCartItem); // Add the new item
        writeCartItems(cartItems, out); // Write back to cart.json
    }

    private JSONArray readCartItems() throws IOException {
        JSONObject existingData;
        JSONArray cartItems;

        File file = new File(CART_FILE);
        if (file.exists()) {
            try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                StringBuilder jsonContent = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    jsonContent.append(line);
                }
                existingData = new JSONObject(jsonContent.toString());
                cartItems = existingData.optJSONArray("cart");
            }
        } else {
            cartItems = new JSONArray(); // Create a new array if the file doesn't exist
        }

        // If the cartItems array is null, create a new one
        if (cartItems == null) {
            cartItems = new JSONArray();
        }

        return cartItems;
    }

    private void writeCartItems(JSONArray cartItems, PrintWriter out) throws IOException {
        JSONObject existingData = new JSONObject();
        existingData.put("cart", cartItems);

        try (FileWriter fileWriter = new FileWriter(CART_FILE)) {
            fileWriter.write(existingData.toString(4)); // Pretty print with an indent of 4 spaces
        }
    }
}
