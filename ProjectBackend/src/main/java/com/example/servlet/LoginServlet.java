package com.example.servlet;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONTokener;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        PrintWriter out = response.getWriter();

        
        try {
            // Read request data
            BufferedReader reader = request.getReader();
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            
            // Parse JSON request using org.json
            JSONObject requestData = new JSONObject(sb.toString());
            
            // Extract email and password
            String email = (String) requestData.get("email");
            String password = (String) requestData.get("password");
            
            // Validate input
            if (email == null || password == null) {
                throw new IllegalArgumentException("Email and password must be provided.");
            }
            
            // Use the absolute path to Users.json
            String realPath = "C:\\Users\\Asus\\Documents\\CAT201\\Project\\CATProject-ecommerce-website\\ProjectBackend\\src\\main\\webapp\\data\\Users.json";
            File usersFile = new File(realPath);
            if (!usersFile.exists()) {
                throw new FileNotFoundException("Users.json not found at: " + realPath);
            }
            
            // Read and parse Users.json using org.json
            JSONObject usersJson = new JSONObject(new JSONTokener(new FileReader(usersFile)));
            JSONArray users = usersJson.getJSONArray("users");
            
            boolean isValidUser = false;
            for (Object userObj : users) {
                JSONObject user = (JSONObject) userObj;
                if (user.get("email").equals(email) && user.get("password").equals(password)) {
                    isValidUser = true;
                    break;
                }
            }
            
            // Prepare JSON response
            JSONObject jsonResponse = new JSONObject();
            if (isValidUser) {
                jsonResponse.put("status", "success");
                jsonResponse.put("message", "Login successful");
            } else {
                jsonResponse.put("status", "error");
                jsonResponse.put("message", "Invalid email or password");
            }
            
            out.print(jsonResponse.toString());
            
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Login failed: " + e.getMessage());
            out.print(jsonResponse.toString());
        } finally {
            out.flush();
            out.close();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        PrintWriter out = response.getWriter();

        try {
            // Use the absolute path to Users.json
            String realPath = "C:\\Users\\Jack\\Documents\\CAT201\\Project2\\CATProject-ecommerce-website\\ProjectBackend\\src\\main\\webapp\\data\\Users.json";
            File usersFile = new File(realPath);
            if (!usersFile.exists()) {
                throw new FileNotFoundException("Users.json not found at: " + realPath);
            }

            // Read and parse Users.json using org.json
            JSONObject usersJson = new JSONObject(new JSONTokener(new FileReader(usersFile)));
            
            // Prepare JSON response
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("users", usersJson.getJSONArray("users")); // Include users array in response
            
            out.print(jsonResponse.toString());
            
        } catch (Exception e) {
            e.printStackTrace(); // Log the error
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("status", "error");
            jsonResponse.put("message", "Failed to retrieve users: " + e.getMessage());
            out.print(jsonResponse.toString());
        } finally {
            out.flush();
            out.close();
        }
    }
}