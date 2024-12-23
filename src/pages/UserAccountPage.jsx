import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../UserContext";

export default function UserAccountPage() {
  // const [userInfo, setUserInfo] = useState({
  //   name: '',
  //   email: '',
  //   preferences: {}
  // });
  // const [editMode, setEditMode] = useState(false);

const { user } = useContext(UserContext);

  useEffect(() => {
    // Placeholder for fetching user info
    axios.get('/api/user/info')
      .then(response => setUserInfo(response.data))
      .catch(error => console.error('Failed to fetch user info', error));
  }, []);

  // const handleEditToggle = () => {
  //   setEditMode(!editMode);
  // };

  // const handleSaveChanges = () => {
  //   axios.post('/api/user/update', userInfo)
  //     .then(() => {
  //       alert('Information updated successfully!');
  //       setEditMode(false);
  //     })
  //     .catch(error => console.error('Failed to update user info', error));
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserInfo(prev => ({ ...prev, [name]: value }));
  // };

  return (
    <div>
      <h1>User Account Page</h1>
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>

    </div>
  );
}
