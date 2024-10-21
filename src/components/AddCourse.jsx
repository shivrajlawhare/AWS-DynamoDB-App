import React, { useState } from 'react';
import dynamoDB from '../awsConfig';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

const AddCourse = () => {
  const [courseID, setCourseID] = useState('');
  const [courseName, setCourseName] = useState('');

  const addCourse = async () => {
    const params = {
      TableName: 'CoursesTable',
      Item: {
        courseID,
        courseName,
      },
    };

    try {
      const command = new PutCommand(params);
      await dynamoDB.send(command);
      alert('Course added successfully!');
      setCourseID('');
      setCourseName('');
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Add Course</h2>
      <input
        type="text"
        placeholder="Course ID"
        value={courseID}
        onChange={(e) => setCourseID(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg"
      />
      <input
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        onClick={addCourse}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Course
      </button>
    </div>
  );
};

export default AddCourse;
