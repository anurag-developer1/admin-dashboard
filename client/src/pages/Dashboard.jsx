import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePage from '../components/Homepage'; 
import EmployeeList from '../components/EmployeeList';  
import CreateEmployee from '../components/CreateEmployee';
import EditEmployee from '../components/EditEmployee';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const employeesPerPage = 5;
  const navigate = useNavigate();
  const username = "Hukum Gupta";

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${baseUrl}/api/employees/fetchEmployees`, {
        params: {
          page: currentPage,
          limit: employeesPerPage,
          search: searchTerm,
        },
        ...config,
      });

      setEmployees(response.data.employees);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, searchTerm]);

  const handleEmployeeCreated = (newEmployee) => {
    if (newEmployee && typeof newEmployee === 'object') {
      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    }
  };

  const handleEmployeeUpdated = async (updatedEmployee) => {
    try {
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.f_Id === updatedEmployee.f_Id ? updatedEmployee : employee
        )
      );
      await fetchEmployees();
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating employee list:', error);
    }
  };

  const handleDelete = async (f_Id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.delete(`${baseUrl}/api/employees/${f_Id}`, config);
      
      setEmployees((prevEmployees) => prevEmployees.filter(employee => employee.f_Id !== f_Id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600 ml-2">Logo</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setShowCreateForm(false);
                    setShowEditForm(false);
                  }}
                  className={`${
                    activeTab === 'home'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setActiveTab('employees');
                    setShowCreateForm(false);
                    setShowEditForm(false);
                  }}
                  className={`${
                    activeTab === 'employees'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Employee List
                </button>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <span className="text-gray-500 mr-4">{username}</span>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  setActiveTab('home');
                  setShowCreateForm(false);
                  setShowEditForm(false);
                  setIsMobileMenuOpen(false);
                }}
                className={`${
                  activeTab === 'home'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveTab('employees');
                  setShowCreateForm(false);
                  setShowEditForm(false);
                  setIsMobileMenuOpen(false);
                }}
                className={`${
                  activeTab === 'employees'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                Employee List
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-indigo-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            {showCreateForm ? (
              <CreateEmployee onCancel={() => setShowCreateForm(false)} onEmployeeCreated={handleEmployeeCreated} />
            ) : showEditForm ? (
              <EditEmployee
                employee={selectedEmployee}
                onCancel={() => setShowEditForm(false)}
                onEmployeeUpdated={handleEmployeeUpdated}
              />
            ) : activeTab === 'home' ? (
              <HomePage />
            ) : (
              <EmployeeList
                employees={employees}
                onCreate={() => setShowCreateForm(true)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;