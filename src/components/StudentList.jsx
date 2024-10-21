import React, { useEffect, useState } from 'react';
import dynamoDB from '../awsConfig';
import { ScanCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudentID, setEditingStudentID] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedAge, setUpdatedAge] = useState('');

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

  const startEditing = (student) => {
    setEditingStudentID(student.studentID);
    setUpdatedName(student.name);
    setUpdatedAge(student.age);
  };

  const updateStudent = async () => {
    const params = {
      TableName: 'StudentsTable',
      Key: {
        studentID: editingStudentID,
      },
      UpdateExpression: 'set #name = :name, #age = :age',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#age': 'age',
      },
      ExpressionAttributeValues: {
        ':name': updatedName,
        ':age': updatedAge,
      },
    };

    try {
      const command = new UpdateCommand(params);
      await dynamoDB.send(command);
      setStudents(
        students.map((student) =>
          student.studentID === editingStudentID
            ? { ...student, name: updatedName, age: updatedAge }
            : student
        )
      );
      setEditingStudentID(null);
      setUpdatedName('');
      setUpdatedAge('');
      alert('Student updated successfully!');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-left">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Age</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{student.studentID}</td>
              <td className="py-2 px-4">{student.name}</td>
              <td className="py-2 px-4">{student.age}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => deleteStudent(student.studentID)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
                <button
                  onClick={() => startEditing(student)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-300"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingStudentID && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Update Student</h3>
          <input
            type="text"
            placeholder="Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Age"
            value={updatedAge}
            onChange={(e) => setUpdatedAge(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg"
          />
          <div className="flex space-x-2">
            <button
              onClick={updateStudent}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Save
            </button>
            <button
              onClick={() => setEditingStudentID(null)}
              className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
