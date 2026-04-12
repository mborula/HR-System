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

	public Employee getEmployeeById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Employee not found"));
	}

    public List<Employee> getEmployeesByLastName(String lastName) {
        return repository.findByLastNameContainingIgnoreCase(lastName);
    }

	public Employee updateEmployee(Long id, Employee updatedEmployee) {

		Employee employee = repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Employee not found"));

		employee.setFirstName(updatedEmployee.getFirstName());
		employee.setLastName(updatedEmployee.getLastName());
		employee.setEmail(updatedEmployee.getEmail());
		employee.setPosition(updatedEmployee.getPosition());
		employee.setSalary(updatedEmployee.getSalary());
		employee.setAddress(updatedEmployee.getAddress());
		employee.setPhone(updatedEmployee.getPhone());

		return repository.save(employee);
	}

	public void deleteEmployee(Long id) {
		repository.deleteById(id);
	}
}
