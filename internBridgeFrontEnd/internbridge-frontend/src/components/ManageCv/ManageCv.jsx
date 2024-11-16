import React from 'react';

const ManageCv = ({ setActiveComponent }) => {
  return (
    <div>
      <h2>Manage Your CV</h2>
      <br/>
      <h5>Select an option:</h5>
      <button onClick={() => setActiveComponent('upload')}>Upload Your Own CV</button>
      <button onClick={() => setActiveComponent('generate')}>Generate and Upload CV</button>
    </div>
  );
};

export default ManageCv;
