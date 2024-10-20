import React, { useState } from 'react';
import ManageCv from '../../components/ManageCv/ManageCv';
import UploadCv from '../../components/ManageCv/UploadCv';
import UploadGeneratedCv from '../../components/ManageCv/UploadGeneratedCv';
import Layout from  '../../Layout/Layout';
const ManageCvPage = ({ role }) => {
  const [activeComponent, setActiveComponent] = useState('manage'); // State to toggle between pages

  const renderComponent = () => {


    switch (activeComponent) {
      case 'upload':
        return <UploadCv />;
      case 'generate':
        return <UploadGeneratedCv />;
      default:
        return <ManageCv setActiveComponent={setActiveComponent} />;
    }
  };

  return (

    <Layout role={role}>

      <div>{renderComponent()}</div>;

    </Layout>
  );
  
  
  
 
};

export default ManageCvPage;
