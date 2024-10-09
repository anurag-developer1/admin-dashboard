import React from 'react';

const EmployeeList = ({
  employees,
  onCreate,
  onEdit,
  onDelete,
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <span>Total Count: {employees.length}</span>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={onCreate}
        >
          Create New Employee
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full px-4 py-2 border rounded-lg border-indigo-600"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on new search
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="px-6 py-4 whitespace-nowrap">{employee.f_Id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={employee.f_Image || 'default-image-url.jpg'} alt="Employee" className="w-10 h-10 rounded-full" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.f_Name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.f_Email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.f_Mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.f_Designation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.f_gender}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.f_Course.join(', ')}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(employee.f_Createdate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => onEdit(employee)}>Edit</button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => onDelete(employee.f_Id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;