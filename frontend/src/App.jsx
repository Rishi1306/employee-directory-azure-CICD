import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import AddEmployeeModal from './components/AddEmployeeModal';
import { getEmployees, addEmployee, deleteEmployee } from './services/employeeService';

function App() {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Notification state
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      showAlert("Failed to load employee list. Please check backend service.", "danger");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (newEmpData) => {
    try {
      const created = await addEmployee(newEmpData);
      setEmployees((prev) => [...prev, created]);
      showAlert(`Employee "${created.name}" created successfully!`, "success");
    } catch (err) {
      console.error("Error adding employee:", err);
      showAlert("Failed to add employee. Please try again.", "danger");
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      showAlert("Employee record removed successfully.", "success");
    } catch (err) {
      console.error("Error deleting employee:", err);
      showAlert("Failed to delete employee. Please try again.", "danger");
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      <main className="container my-4 flex-grow-1">
        {/* Header section with title and add action */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h2 className="fw-bold mb-1">Employee Directory</h2>
            <p className="text-muted mb-0">Manage and view your organization's workforce records.</p>
          </div>
          <button
            className="btn btn-primary d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="bi bi-plus-lg"></i>
            <span>Add Employee</span>
          </button>
        </div>

        {/* Global Notification Alerts */}
        {alert.show && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show shadow-sm`} role="alert">
            <i className={`bi ${alert.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
            {alert.message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlert({ show: false, message: '', type: 'success' })}
            ></button>
          </div>
        )}

        {/* Main Employee Table */}
        <EmployeeList
          employees={employees}
          onDeleteEmployee={handleDeleteEmployee}
          isLoading={isLoading}
        />
      </main>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEmployee={handleAddEmployee}
      />

      <footer className="bg-white border-top py-3 mt-auto text-center text-muted">
        <small>&copy; {new Date().getFullYear()} Employee Directory System. Built with Spring Boot & React.</small>
      </footer>
    </div>
  );
}

export default App;
