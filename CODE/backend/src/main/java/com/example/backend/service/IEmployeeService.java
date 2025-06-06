package com.example.backend.service;

import com.example.backend.model.Employee;

import java.util.List;

public interface IEmployeeService {
    Employee add(Employee customer);

    Employee getById(Long id);

    List<Employee> getAll();

    Employee update(Employee customer);

    void deleteById(Long id);


    Employee getByEmailAndPassword(String email, String password);
    Employee getByEmail(String email);
}
