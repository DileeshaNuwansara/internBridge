import React, { useState } from 'react';
import Layout from '../../Layout/Layout';
import Profile from '../../components/Profile/Profile';
import { CgProfile } from "react-icons/cg";

const AdminProfileSettings = () => {
  const [showProfile, setShowProfile] = useState(false);
  const handleOpenProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Layout role={role}>
      <h2>Admin Profile Settings</h2>

      <button
        type="button"
        className="btn btn-primary d-flex align-items-center"
        onClick={handleOpenProfile}
      >
        <CgProfile className="me-2" />
        Open Profile
      </button>

      <Profile role={role} show={showProfile} handleClose={handleCloseProfile} />
    </Layout>
  );
};

export default AdminProfileSettings;
