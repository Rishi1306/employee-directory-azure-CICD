package com.example.employeedirectory.service;

import com.example.employeedirectory.model.Employee;
import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    Employee saveEmployee(Employee employee);
    void deleteEmployee(Long id);
    Optional<Employee> getEmployeeById(Long id);
}
