package com.example.hr_manager.service;

import com.example.hr_manager.entity.Employee;
import com.example.hr_manager.repo.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
	private final EmployeeRepository repository;

	public EmployeeService(EmployeeRepository repository) {
		this.repository = repository;
	}

	public List<Employee> getAllEmployees() {
		return repository.findAll();
	}

	public Employee saveEmployee(Employee employee) {
		return repository.save(employee);
	}
}
