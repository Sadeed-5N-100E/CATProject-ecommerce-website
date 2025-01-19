package com.example.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileWriter;
import java.io.IOException;
import java.util.logging.Logger;

@WebServlet("/ClearCartServlet")
public class ClearCartServlet extends HttpServlet {

    private static final String CART_FILE = "C:\\Users\\Jack\\Documents\\CAT201\\Project2\\CATProject-ecommerce-website\\ProjectBackend\\src\\main\\webapp\\data\\Cart.json"; // Update this path
    private static final Logger logger = Logger.getLogger(ClearCartServlet.class.getName());

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try (FileWriter fileWriter = new FileWriter(CART_FILE)) {
            fileWriter.write("{\"cart\":[]}"); // Write an empty cart array
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write("{\"message\":\"Cart cleared successfully.\"}");
            logger.info("Cart cleared successfully.");
        } catch (IOException e) {
            logger.severe("Failed to clear cart: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"message\":\"Failed to clear cart.\"}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write("{\"message\":\"ClearCartServlet is ready to handle requests.\"}");
    }
} 