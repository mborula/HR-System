package com.example.hr_manager.repo;

import com.example.hr_manager.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

	public interface EmployeeRepository extends JpaRepository<Employee, Long> {

	}
