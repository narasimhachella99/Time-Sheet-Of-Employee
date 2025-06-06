package com.example.backend.repository;

import com.example.backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEmployeeRepository extends JpaRepository<Employee,Long> {
    Employee findByEmailAndPassword(String email, String Password);

    Employee findByEmail(String email);
}
