import React from 'react';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';

const App = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Cloud Computing FA-2: DynamoDB Integration</h1>
      <AddStudent />
      <StudentList />
    </div>
  );
};

export default App;
