package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDTO;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.impl.EmployeeServiceImpl;
import net.sf.jasperreports.engine.JRException;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*") // Cho phép React (vite dev server) gọi đến
@RestController
@RequestMapping("/api/employees")
@AllArgsConstructor
public class EmployeeController {

    private final EmployeeServiceImpl employeeService;
    private final EmployeeRepository employeeRepository;

    // 👉 1. CREATE EMPLOYEE
    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO savedEmployee = employeeService.createEmployee(employeeDTO);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    // 👉 2. GET EMPLOYEE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable("id") Long employeeID) {
        EmployeeDTO employeeDTO = employeeService.getEmployeeById(employeeID);
        return ResponseEntity.ok(employeeDTO);
    }

    // 👉 3. GET ALL EMPLOYEES
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // 👉 4. UPDATE EMPLOYEE
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable("id") Long employeeID,
                                                      @RequestBody EmployeeDTO updatedEmployee) {
        EmployeeDTO employeeDTO = employeeService.updateEmployee(employeeID, updatedEmployee);
        return ResponseEntity.ok(employeeDTO);
    }

    // 👉 5. DELETE EMPLOYEE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeID) {
        employeeService.deleteEmployee(employeeID);
        return ResponseEntity.ok("Employee deleted successfully!");
    }

    @GetMapping("/export-list/{format}")
    public ResponseEntity<ByteArrayResource> getItemReport(@PathVariable String format) throws JRException, IOException {
        List<Employee> employees = employeeRepository.findAll();
        byte[] reportContent = employeeService.getItemReport(employees, format);

        ByteArrayResource resource = new ByteArrayResource(reportContent);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=item-report.pdf")
                .body(resource);
    }

}