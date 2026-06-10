package com.example.hr_manager.service;

import com.example.hr_manager.entity.Department;
import com.example.hr_manager.entity.Employee;
import com.example.hr_manager.repo.DepartmentRepository;
import com.example.hr_manager.repo.EmployeeRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository repository;
    private final EmployeeRepository employeeRepository;

    public DepartmentService(
            DepartmentRepository repository,
            EmployeeRepository employeeRepository
    ) {
        this.repository = repository;
        this.employeeRepository = employeeRepository;
    }

    public List<Department> getAllDepartments() {
        return repository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
    }

    public Department createDepartment(Department department) {
        if (department.getName() == null || department.getName().isBlank()) {
            throw new RuntimeException("Department name cannot be empty");
        }

        repository.findByNameIgnoreCase(department.getName())
                .ifPresent(existing -> {
                    throw new RuntimeException("Department already exists");
                });

        return repository.save(department);
    }

    public Department updateDepartment(Long id, Department updatedDepartment) {
        Department department = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        if (updatedDepartment.getName() == null || updatedDepartment.getName().isBlank()) {
            throw new RuntimeException("Department name cannot be empty");
        }

        department.setName(updatedDepartment.getName());

        return repository.save(department);
    }

    @Transactional
    public void deleteDepartment(Long id) {
        Department department = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));

        List<Employee> employees = employeeRepository.findByDepartmentId(id);

        for (Employee employee : employees) {
            employee.setDepartment(null);
        }

        employeeRepository.saveAll(employees);
        repository.delete(department);
    }
}
