import React from 'react';

const ParentDetails = ({ parents }) => {
  return (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">Parent Details</h3>
      {parents.length > 0 ? (
        <ul>
          {parents.map((parent, index) => (
            <li key={index} className="border-b py-2">
              <span className="font-semibold">{parent.parentName}</span> - {parent.contactNumber}
            </li>
          ))}
        </ul>
      ) : (
        <p>No parents available for this student.</p>
      )}
    </div>
  );
};

export default ParentDetails;
