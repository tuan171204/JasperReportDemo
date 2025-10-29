import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees, exportList } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ListEmployee = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate()

    useEffect(() => {
        getAllEmployees()
    }, [])

    const getAllEmployees = () => {
        listEmployees().
            then((response) => {
                console.log("response.data typeof:", typeof response.data);
                console.log("response.data:", response.data);
                setEmployees(response.data)
            })
            .catch(error => {
                console.log(error)
                toast.error("Something went wrong !")
            })
    }

    const addNewEmployee = () => {
        navigator('/add-employee')
    }

    const updateEmployee = (id) => {
        navigator(`/edit-employee/${id}`)
    }

    const removeEmployee = (id) => {
        deleteEmployee(id)
            .then(response => {
                getAllEmployees()
                toast.success("Delete Employee Successful !")
            })
            .catch(error => {
                console.error(error)
                toast.error("Something went wrong: " + error)
            })
    }

     const handleExportList = () => {
         navigator("/export-list");
      };

    return (
        <div className='container center'>
            <h2 className='text-center mb-4'>List of Employees</h2>
            <button className='btn btn-primary m-2' onClick={addNewEmployee}>Add Employee</button>
            <button className='btn btn-success m-2' onClick={handleExportList}>Export List</button>
            <table className='table table-hover table-striped table-bordered text-center'>
                <thead className='thead thead-dark'>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td className='d-flex gap-1 justify-content-evenly'>
                                <button className='btn btn-warning' onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployee