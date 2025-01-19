package com.example.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONTokener;

@WebServlet("/SignupServlet")
public class SignupServlet extends HttpServlet {
    private static final String USERS_FILE = "C:\\Users\\Asus\\Documents\\CAT201\\Project\\CATProject-ecommerce-website\\ProjectBackend\\src\\main\\webapp\\data\\Users.json";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            StringBuilder sb = new StringBuilder();
            String line;
            BufferedReader reader = request.getReader();
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }

            JSONObject newUser = new JSONObject(sb.toString());
            JSONArray usersArray = readUsers();

            // Check if the email already exists
            for (int i = 0; i < usersArray.length(); i++) {
                JSONObject user = usersArray.getJSONObject(i);
                if (user.getString("email").equals(newUser.getString("email"))) {
                    response.getWriter().write("{\"status\":\"error\", \"message\":\"Email already exists.\"}");
                    return;
                }
            }

            // Add new user to the array
            usersArray.put(newUser);
            writeUsers(usersArray);

            response.getWriter().write("{\"status\":\"success\"}");
        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace(); // Print stack trace to console or log file
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\", \"message\":\"" + e.getMessage() + "\"}");
        }
    }

    private JSONArray readUsers() throws IOException {
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = new BufferedReader(new FileReader(USERS_FILE));
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        reader.close();
        return new JSONObject(sb.toString()).getJSONArray("users");
    }

    private void writeUsers(JSONArray usersArray) throws IOException {
        JSONObject usersObject = new JSONObject();
        usersObject.put("users", usersArray);
        FileWriter fileWriter = new FileWriter(USERS_FILE);
        fileWriter.write(usersObject.toString(4)); // Pretty print with 4 spaces
        fileWriter.close();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
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
