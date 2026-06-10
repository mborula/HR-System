package com.example.hr_manager.service;

import com.example.hr_manager.entity.Department;
import com.example.hr_manager.entity.Employee;
import com.example.hr_manager.repo.DepartmentRepository;
import com.example.hr_manager.repo.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

	private final EmployeeRepository repository;
	private final DepartmentRepository departmentRepository;

	public EmployeeService(
			EmployeeRepository repository,
			DepartmentRepository departmentRepository
	) {
		this.repository = repository;
		this.departmentRepository = departmentRepository;
	}

	public List<Employee> getAllEmployees() {
		return repository.findAll();
	}

	public Employee saveEmployee(Employee employee) {
		setDepartmentIfExists(employee, employee.getDepartment());
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

		setDepartmentIfExists(employee, updatedEmployee.getDepartment());

		return repository.save(employee);
	}

	public void deleteEmployee(Long id) {
		repository.deleteById(id);
	}

	private void setDepartmentIfExists(Employee employee, Department departmentFromRequest) {
		if (departmentFromRequest != null && departmentFromRequest.getId() != null) {
			Department department = departmentRepository.findById(departmentFromRequest.getId())
					.orElseThrow(() -> new RuntimeException("Department not found"));

			employee.setDepartment(department);
		} else {
			employee.setDepartment(null);
		}
	}
}