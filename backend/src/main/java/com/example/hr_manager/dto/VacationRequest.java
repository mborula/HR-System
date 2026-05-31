package com.example.hr_manager.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class VacationRequest {

    private Long employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
}