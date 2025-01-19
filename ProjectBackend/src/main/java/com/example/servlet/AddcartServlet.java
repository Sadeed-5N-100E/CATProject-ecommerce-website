package com.example.servlet;

import com.example.model.Cart;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/AddcartServlet")
public class AddcartServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Set response type
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        // Get parameters from the request
        String productId = request.getParameter("productId");
        int quantity = Integer.parseInt(request.getParameter("quantity"));

        // Get the session and cart
        HttpSession session = request.getSession();
        Cart cart = (Cart) session.getAttribute("cart");

        if (cart == null) {
            cart = new Cart(); // Create a new cart if it doesn't exist
        }

        // Add the item to the cart
        boolean success = cart.addItem(productId, quantity);

        // Update the session
        session.setAttribute("cart", cart);

        // Send response
        if (success) {
            out.write("{\"status\":\"success\", \"message\":\"Item added to cart.\"}");
        } else {
            out.write("{\"status\":\"error\", \"message\":\"Failed to add item to cart.\"}");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
}
