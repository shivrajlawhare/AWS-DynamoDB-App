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
    <div>
      <h2>Add Student</h2>
      <input
        type="text"
        placeholder="Student ID"
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={addStudent}>Add Student</button>
    </div>
  );
};

export default AddStudent;
