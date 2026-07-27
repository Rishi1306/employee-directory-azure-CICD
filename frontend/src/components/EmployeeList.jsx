import React from 'react';

const EmployeeList = ({ employees, onDeleteEmployee, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading employees...</span>
        </div>
        <p className="text-muted mt-2">Loading employee directory...</p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="text-center py-5 border rounded bg-white shadow-sm">
        <i className="bi bi-people text-muted display-4"></i>
        <h5 className="mt-3 text-secondary">No Employees Found</h5>
        <p className="text-muted">Click the "Add Employee" button above to insert your first record.</p>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col" className="px-4 py-3">ID</th>
              <th scope="col" className="py-3">Name</th>
              <th scope="col" className="py-3">Department</th>
              <th scope="col" className="py-3">Email</th>
              <th scope="col" className="text-end px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="px-4 fw-semibold text-muted">#{emp.id}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                      style={{ width: '36px', height: '36px', fontSize: '14px' }}
                    >
                      {emp.name ? emp.name.charAt(0).toUpperCase() : 'E'}
                    </div>
                    <span className="fw-semibold text-dark">{emp.name}</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-department">
                    {emp.department}
                  </span>
                </td>
                <td className="text-secondary">{emp.email}</td>
                <td className="text-end px-4">
                  <button
                    className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1"
                    onClick={() => onDeleteEmployee(emp.id)}
                    title="Delete Employee"
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
