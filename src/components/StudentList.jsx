import React, { useEffect, useState } from 'react';
import dynamoDB from '../awsConfig';
import { ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const params = {
        TableName: 'StudentsTable',
      };

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

  const deleteStudent = async (studentID) => {
    const params = {
      TableName: 'StudentsTable',
      Key: {
        studentID: studentID,
      },
    };

    try {
      const command = new DeleteCommand(params);
      await dynamoDB.send(command);
      setStudents(students.filter(student => student.studentID !== studentID));
      alert('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.studentID} - {student.name} - {student.age}
            <button onClick={() => deleteStudent(student.studentID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
