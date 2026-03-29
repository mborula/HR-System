package com.example.hr_manager.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Employee {
	@Setter
	@Getter
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;

	@Getter
    @Setter
    private String firstName;
	@Setter
    @Getter
    private String lastName;
	@Setter
    @Getter
    private String address;
	@Setter
    @Getter
    private String email;
	@Setter
    @Getter
    private String phone;
	@Setter
    @Getter
    private String position;
	@Setter
    @Getter
    private Double salary;
	@ManyToOne
	@JoinColumn(name = "department_id")
	private Department department;

	public Employee() {
	}

	public Employee(String firstName, String lastName, String address,
	                String email, String phone, String position,
	                Double salary) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.email = email;
		this.phone = phone;
		this.position = position;
		this.salary = salary;
	}

}
