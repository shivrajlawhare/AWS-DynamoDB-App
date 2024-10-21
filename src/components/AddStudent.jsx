import React, { useState, useEffect } from 'react';
import dynamoDB from '../awsConfig';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const AddStudent = () => {
  const [studentID, setStudentID] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(''); // Change to single string
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const params = { TableName: 'CoursesTable' };
      try {
        const command = new ScanCommand(params);
        const data = await dynamoDB.send(command);
        if (data.Items) {
          setCourses(data.Items);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const addStudent = async () => {
    if (!studentID || !name || !age || !selectedCourse) { // Check for single selected course
      alert('Please fill all fields and select a course.');
      return;
    }

    const params = {
      TableName: 'StudentsTable',
      Item: {
        studentID,
        name,
        age,
        enrolledCourse: selectedCourse, // Store as a single string
      },
    };

    try {
      const command = new PutCommand(params);
      await dynamoDB.send(command);
      alert('Student added successfully!');
      setStudentID('');
      setName('');
      setAge('');
      setSelectedCourse(''); // Reset single course selection
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
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg"
      />
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)} // Update to set a single course
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg"
      >
        <option value="">
          Select a Course
        </option>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <option key={index} value={course.courseID}>
              {course.courseName}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No courses available
          </option>
        )}
      </select>
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
