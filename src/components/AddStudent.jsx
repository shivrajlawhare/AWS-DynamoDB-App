import React, { useState } from 'react';
import dynamoDB from '../awsConfig';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

const AddStudent = () => {
  const [studentID, setStudentID] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const addStudent = async () => {
    const params = {
      TableName: 'StudentsTable',
      Item: {
        studentID,
        name,
        age
      }
    };

    try {
      const command = new PutCommand(params);
      await dynamoDB.send(command);
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Add Student</h2>
      <input
        type="text"
        placeholder="Student ID"
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        onClick={addStudent}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Student
      </button>
    </div>
  );
};

export default AddStudent;
