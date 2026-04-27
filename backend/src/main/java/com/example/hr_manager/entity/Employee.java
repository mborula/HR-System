package com.example.hr_manager.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Employee {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private String phone;
    private String position;
    private Double salary;
	@ManyToOne
	@JoinColumn(name = "department_id")
	private Department department;
    @ManyToOne
    @JoinColumn(name = "vacation_id")
    private Vacation vacation;


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
