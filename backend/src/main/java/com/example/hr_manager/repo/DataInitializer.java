package com.example.hr_manager.repo;

import com.example.hr_manager.entity.Employee;
import com.example.hr_manager.repo.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(EmployeeRepository repo) {
        return args -> {

            repo.deleteAll();

            repo.save(new Employee("Jan", "Kowalski", "Warszawa", "jan@example.com", "123456789", "Developer", 8000.0));
            repo.save(new Employee("Anna", "Nowak", "Kraków", "anna@example.com", "1231236789", "HR Manager", 7500.0));
            repo.save(new Employee("Piotr", "Wiśniewski", "Gdańsk", "piotr@example.com", "111222333", "Backend Dev", 9000.0));
            repo.save(new Employee("Katarzyna", "Wójcik", "Wrocław", "kasia@example.com", "444555666", "Frontend Dev", 8500.0));
            repo.save(new Employee("Tomasz", "Kamiński", "Poznań", "tomek@example.com", "777888999", "DevOps", 9500.0));
            repo.save(new Employee("Magdalena", "Lewandowska", "Łódź", "magda@example.com", "222333444", "Tester", 6500.0));
            repo.save(new Employee("Paweł", "Zieliński", "Szczecin", "pawel@example.com", "555666777", "Manager", 10000.0));
            repo.save(new Employee("Agnieszka", "Szymańska", "Lublin", "aga@example.com", "888999000", "Analyst", 8200.0));
            repo.save(new Employee("Michał", "Dąbrowski", "Katowice", "michal@example.com", "333444555", "Support", 6000.0));
            repo.save(new Employee("Ewa", "Kaczmarek", "Białystok", "ewa@example.com", "666777888", "UX Designer", 7800.0));

            System.out.println("Test employees loaded");
        };
    }
}