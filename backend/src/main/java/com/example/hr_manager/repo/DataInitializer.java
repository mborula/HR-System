package com.example.hr_manager.repo;

import com.example.hr_manager.entity.Department;
import com.example.hr_manager.entity.Employee;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            EmployeeRepository employeeRepository,
            DepartmentRepository departmentRepository
    ) {
        return args -> {
            employeeRepository.deleteAll();
            departmentRepository.deleteAll();

            Department it = departmentRepository.save(new Department("IT"));
            Department hr = departmentRepository.save(new Department("HR"));
            Department finance = departmentRepository.save(new Department("Finance"));
            Department support = departmentRepository.save(new Department("Support"));

            Employee jan = new Employee("Jan", "Kowalski", "Warszawa", "jan@example.com", "123456789", "Developer", 8000.0);
            jan.setDepartment(it);

            Employee anna = new Employee("Anna", "Nowak", "Krakow", "anna@example.com", "1231236789", "HR Manager", 7500.0);
            anna.setDepartment(hr);

            Employee piotr = new Employee("Piotr", "Wisniewski", "Gdansk", "piotr@example.com", "111222333", "Backend Dev", 9000.0);
            piotr.setDepartment(it);

            Employee katarzyna = new Employee("Katarzyna", "Wojcik", "Wroclaw", "kasia@example.com", "444555666", "Frontend Dev", 8500.0);
            katarzyna.setDepartment(it);

            Employee tomasz = new Employee("Tomasz", "Kaminski", "Poznan", "tomek@example.com", "777888999", "DevOps", 9500.0);
            tomasz.setDepartment(it);

            Employee magdalena = new Employee("Magdalena", "Lewandowska", "Lodz", "magda@example.com", "222333444", "Tester", 6500.0);
            magdalena.setDepartment(it);

            Employee pawel = new Employee("Pawel", "Zielinski", "Szczecin", "pawel@example.com", "555666777", "Manager", 10000.0);
            pawel.setDepartment(finance);

            Employee agnieszka = new Employee("Agnieszka", "Szymanska", "Lublin", "aga@example.com", "888999000", "Analyst", 8200.0);
            agnieszka.setDepartment(finance);

            Employee michal = new Employee("Michal", "Dabrowski", "Katowice", "michal@example.com", "333444555", "Support", 6000.0);
            michal.setDepartment(support);

            Employee ewa = new Employee("Ewa", "Kaczmarek", "Bialystok", "ewa@example.com", "666777888", "UX Designer", 7800.0);
            ewa.setDepartment(it);

            employeeRepository.save(jan);
            employeeRepository.save(anna);
            employeeRepository.save(piotr);
            employeeRepository.save(katarzyna);
            employeeRepository.save(tomasz);
            employeeRepository.save(magdalena);
            employeeRepository.save(pawel);
            employeeRepository.save(agnieszka);
            employeeRepository.save(michal);
            employeeRepository.save(ewa);

            System.out.println("Test departments and employees loaded");
        };
    }
}