import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserAccountPage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    preferences: {}
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Placeholder for fetching user info
    axios.get('/api/user/info')
      .then(response => setUserInfo(response.data))
      .catch(error => console.error('Failed to fetch user info', error));
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    axios.post('/api/user/update', userInfo)
      .then(() => {
        alert('Information updated successfully!');
        setEditMode(false);
      })
      .catch(error => console.error('Failed to update user info', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>User Account Page</h1>
      {!editMode ? (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <button onClick={handleEditToggle}>Edit Info</button>
        </div>
      ) : (
        <div>
          <label>
            Name:
            <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
          </label>
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </div>
      )}
    </div>
  );
}
