package net.javaguides.ems.service;

import net.javaguides.ems.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);

    EmployeeDTO getEmployeeById(Long employeeID);

    List<EmployeeDTO> getAllEmployees();

    EmployeeDTO updateEmployee(Long employeeID, EmployeeDTO updatedEmployee);

    void deleteEmployee(Long employeeID);
}
