import React from 'react';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';

const App = () => {
  return (
    <div>
      <h1>Cloud Computing FA-2: DynamoDB Integration</h1>
      <AddStudent />
      <StudentList />
    </div>
  );
};

export default App;
