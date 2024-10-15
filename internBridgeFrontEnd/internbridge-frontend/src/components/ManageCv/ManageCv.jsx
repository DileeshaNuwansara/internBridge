import React from 'react';

const ManageCv = ({ setActiveComponent }) => {
  return (
    <div>
      <h1>Manage Your CV</h1>
      <p>Select an option:</p>
      <button onClick={() => setActiveComponent('upload')}>Upload Your Own CV</button>
      <button onClick={() => setActiveComponent('generate')}>Generate and Upload CV</button>
    </div>
  );
};

export default ManageCv;
