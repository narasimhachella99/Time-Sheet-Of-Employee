package com.example.backend.service.impl;

import com.example.backend.model.Employee;
import com.example.backend.repository.IEmployeeRepository;
import com.example.backend.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EmployeeService implements IEmployeeService {
    @Autowired
    private IEmployeeRepository employeeRepository;




    @Override
    public Employee add(Employee customer) {
        return employeeRepository.save(customer);
    }

    @Override
    public Employee getById(Long id) {
        return employeeRepository.findById(id).get();
    }

    @Override
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee update(Employee customer) {
        return employeeRepository.save(customer);
    }

    @Override
    public void deleteById(Long id) {
        employeeRepository.deleteById(id);

    }

    @Override
    public Employee getByEmailAndPassword(String email, String password) {
        return employeeRepository.findByEmailAndPassword(email,password);
    }

    @Override
    public Employee getByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }


}
