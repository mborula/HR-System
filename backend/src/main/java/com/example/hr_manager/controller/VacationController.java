package com.example.hr_manager.controller;

import com.example.hr_manager.entity.Employee;
import com.example.hr_manager.entity.Vacation;
import com.example.hr_manager.service.VacationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vacation")
public class VacationController {

    private final VacationService service;
    public VacationController(VacationService service) {this.service = service;}

    @GetMapping
    public List<Vacation> getVacation() {
        return service.getAllVacation();
    }

    @PostMapping
    public Vacation createVacation((@RequestBody Vacation vacation){return service.saveVacation(vacation);}

    @PutMapping("/{id}")
    public Vacation updateVacation(@PathVariable Long id, @RequestBody Vacation vacation) {
        return service.updateVacation(id, vacation);
    }
    
    @DeleteMapping("/{id}")
    public void deleteVacation(@PathVariable Long id) {
        service.deleteVacation(id);
    }

}
