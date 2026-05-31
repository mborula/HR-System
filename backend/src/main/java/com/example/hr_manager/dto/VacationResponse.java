package com.example.hr_manager.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class VacationResponse {
    private Long vacationId;
    private Long employeeId;
    private String firstName;
    private String lastName;
    private LocalDate startDate;
    private LocalDate endDate;
}
