package com.example.hr_manager.controller;

import com.example.hr_manager.entity.Employee;
import com.example.hr_manager.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

	private final EmployeeService service;

	public EmployeeController(EmployeeService service) {
		this.service = service;
	}

	@GetMapping
	public List<Employee> getEmployees() {
		return service.getAllEmployees();
	}

	@PostMapping
	public Employee createEmployee(@RequestBody Employee employee) {
		return service.saveEmployee(employee);
	}
}
