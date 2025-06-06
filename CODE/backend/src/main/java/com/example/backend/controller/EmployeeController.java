package com.example.backend.controller;

import com.example.backend.model.Employee;
import com.example.backend.model.UserExcelExporter;
import com.example.backend.model.Work;
import com.example.backend.service.IEmployeeService;
import com.example.backend.service.IWorkService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class EmployeeController {
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IWorkService workService;
    @GetMapping("/users/export/excel")
    public void exportToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=users_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        List<Work> listUsers = workService.getAll();

        UserExcelExporter excelExporter = new UserExcelExporter(listUsers);

        excelExporter.export(response);
    }
    @PostMapping("/login")
    private ResponseEntity<?> login(@RequestBody Employee employee) {
        HashMap<String, String> res = new HashMap<>();
        try {
            if (employee.getEmail().equals("") && employee.getPassword().equals("")) {
                res.put("msg", "please fill all the fields");
                return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
            }
            if (employee.getEmail().equals("admin@gmail.com") && employee.getPassword().equals("admin")) {
                res.put("msg", "admin login Successfully");
                return new ResponseEntity<>(res, HttpStatus.OK);
            }
            boolean checkCustomer = employeeService.getByEmailAndPassword(employee.getEmail(), employee.getPassword()) != null;
            if (checkCustomer) {
                res.put("msg", "employee login Successfully");
                return new ResponseEntity<>(res, HttpStatus.OK);
            } else {
                res.put("msg", "invalid credentials");
                return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            res.put("msg", e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/register")
    private ResponseEntity<?> addCustomer(@RequestBody Employee employee) {
        HashMap<String, String> res = new HashMap<>();
        try {
            if (employee.getName().equals("") && employee.getEmail().equals("") && employee.getPassword().equals("")) {
                res.put("msg", "please fill out all the fields");
                return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
            }
            boolean checkCustomer = employeeService.getByEmailAndPassword(employee.getEmail(), employee.getPassword()) != null;
            if (checkCustomer) {
                res.put("msg", "employee already exist");
                return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                employeeService.add(employee);
                res.put("msg", "employee added successfully");
                return new ResponseEntity<>(res, HttpStatus.OK);
            }

        } catch (Exception e) {
            res.put("msg", e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/employee")
    private ResponseEntity<?> getAll() {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(employeeService.getAll(), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/employee/{email}")
    private ResponseEntity<?> getByEmail(@PathVariable String email) {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(employeeService.getByEmail(email), HttpStatus.OK);
        } catch (Exception e) {
            res.put("msg", e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}


