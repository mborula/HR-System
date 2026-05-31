package com.example.hr_manager.service;

import com.example.hr_manager.dto.VacationRequest;
import com.example.hr_manager.entity.Employee;
import com.example.hr_manager.entity.Vacation;
import com.example.hr_manager.repo.VacationRepository;
import com.example.hr_manager.repo.EmployeeRepository;
import lombok.NoArgsConstructor;
import com.example.hr_manager.dto.VacationResponse;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class VacationService {
    private final VacationRepository vacationRepository;
    private final EmployeeRepository employeeRepository;

    public VacationService(
            VacationRepository vacationRepository,
            EmployeeRepository employeeRepository) {

        this.vacationRepository = vacationRepository;
        this.employeeRepository = employeeRepository;
    }

    public List<VacationResponse> getAllVacation() {

        return vacationRepository.findAll().stream()
                .map(v -> {
                    VacationResponse dto = new VacationResponse();

                    dto.setVacationId(v.getId());
                    dto.setStartDate(v.getStartDate());
                    dto.setEndDate(v.getEndDate());

                    if (v.getEmployee() != null) {
                        dto.setEmployeeId(v.getEmployee().getId());
                        dto.setFirstName(v.getEmployee().getFirstName());
                        dto.setLastName(v.getEmployee().getLastName());
                    }

                    return dto;
                })
                .toList();
    }
    public Vacation getVacationById(long id){
        return vacationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vacation not found"));
    }

    public Vacation createVacation(VacationRequest request) {

        Employee employee = this.employeeRepository
                .findById(request.getEmployeeId())
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));
        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new RuntimeException("End date cannot be before start date");
        }
        Vacation vacation = new Vacation();
        vacation.setEmployee(employee);
        vacation.setStartDate(request.getStartDate());
        vacation.setEndDate(request.getEndDate());

        return vacationRepository.save(vacation);
    }


    public Vacation updateVacation(Long id,Vacation updatedVacation) {

        Vacation vacation = vacationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vacation not found"));

        vacation.setStartDate(updatedVacation.getStartDate());
        vacation.setEndDate(updatedVacation.getEndDate());

        return vacationRepository.save(vacation);
    }

    public void deleteVacation(Long id){
        vacationRepository.deleteById(id);
    }

}
