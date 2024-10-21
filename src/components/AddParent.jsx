import React, { useState, useEffect } from 'react';
import dynamoDB from '../awsConfig';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const AddParent = () => {
  const [parentID, setParentID] = useState('');
  const [parentName, setParentName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [studentID, setStudentID] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const params = { TableName: 'StudentsTable' };
      try {
        const command = new ScanCommand(params);
        const data = await dynamoDB.send(command);
        setStudents(data.Items);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const addParent = async () => {
    const params = {
      TableName: 'ParentsTable',
      Item: {
        parentID,
        parentName,
        contactNumber,
        studentID,
      },
    };

    try {
      const command = new PutCommand(params);
      await dynamoDB.send(command);
      alert('Parent added successfully!');
      setParentID('');
      setParentName('');
      setContactNumber('');
      setStudentID('');
    } catch (error) {
      console.error('Error adding parent:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Add Parent</h2>
      <input
        type="text"
        placeholder="Parent ID"
        value={parentID}
        onChange={(e) => setParentID(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        placeholder="Parent Name"
        value={parentName}
        onChange={(e) => setParentName(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg"
      />
      <select
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg"
      >
        <option value="">Select Student</option>
        {students.map((student, index) => (
          <option key={index} value={student.studentID}>
            {student.name}
          </option>
        ))}
      </select>
      <button
        onClick={addParent}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Parent
      </button>
    </div>
  );
};

export default AddParent;
