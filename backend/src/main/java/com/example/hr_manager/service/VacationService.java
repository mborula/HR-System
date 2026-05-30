package com.example.hr_manager.service;

import com.example.hr_manager.entity.Employee;
import com.example.hr_manager.entity.Vacation;
import com.example.hr_manager.repo.VacationRepository;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class VacationService {
    private final VacationRepository repository;

    public VacationService(VacationRepository repository) {this.repository = repository;}

    public List<Vacation> getAllVacation() {
        return repository.findAll();
    }

    public Vacation saveVacation(Vacation vacation){return repository.save(vacation);}

    public Vacation getVacationById(long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vacation not found"));
    }

    public Vacation updateVacation(Long id,Vacation updatedVacation) {

        Vacation vacation = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vacation not found"));

        vacation.setStartDate(updatedVacation.getStartDate());
        vacation.setEndDate(updatedVacation.getEndDate());

        return repository.save(vacation);
    }

    public void deleteVacation(Long id){
        repository.deleteById(id);
    }

}
