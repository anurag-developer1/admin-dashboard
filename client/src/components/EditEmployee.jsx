import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditEmployee = ({ employee, onCancel, onEmployeeUpdated }) => {
  const [formData, setFormData] = useState({ ...employee });

  useEffect(() => {
    setFormData({ ...employee });
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        f_Course: checked ? [value] : [],
      }));
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === 'f_Course') {
          formData[key].forEach((course) => {
            formDataToSend.append('f_Course', course);
          });
        } else if (key === 'f_Image' && formData[key]) {
          formDataToSend.append('f_Image', formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await axios.put(`http://localhost:3000/api/employees/${employee.f_Id}`, formDataToSend, config);
      onEmployeeUpdated(response.data);
      onCancel();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="f_Name"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.f_Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="f_Email"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.f_Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile No</label>
          <input
            type="text"
            name="f_Mobile"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.f_Mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Designation</label>
          <select
            name="f_Designation"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.f_Designation}
            onChange={handleChange}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="f_gender"
                value="Male"
                checked={formData.f_gender === 'Male'}
                onChange={handleChange}
              />
              Male
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="f_gender"
                value="Female"
                checked={formData.f_gender === 'Female'}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Course</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="f_Course"
                value="MCA"
                checked={formData.f_Course.includes('MCA')}
                onChange={handleChange}
              />
              MCA
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="f_Course"
                value="BCA"
                checked={formData.f_Course.includes('BCA')}
                onChange={handleChange}
              />
              BCA
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="f_Course"
                value="BSC"
                checked={formData.f_Course.includes('BSC')}
                onChange={handleChange}
              />
              BSC
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image Upload</label>
          <input
            type="file"
            name="f_Image"
            accept=".jpg,.png"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;