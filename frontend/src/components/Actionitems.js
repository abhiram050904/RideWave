import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.avif';
import avatar from '../images/avatar2.png';
import { FaCarSide } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { useState,useEffect } from 'react';
const Actionitems = () => {


  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('chat-app-user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser); // Attempt to parse the stored JSON
        setUsername(user.username); // Check if the 'username' property exists
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const navigate = useNavigate();

  const handleInputButtonClick = () => {
    navigate('/search'); // Navigate to the search page
  };

  return (
    <ActionContainer>
      <Header>
        <Logo src={logo} alt="Logo" />
        <Profile>
          <span><Name>Welcome, {username || 'User'}!</Name></span>
          <UserImage src={avatar} alt="User" />
        </Profile>
      </Header>
      <ActionButtons>
        <ActionButton onClick={() => navigate('/search')}>
          <StyledIcon as={FaCarSide} />
          Ride
        </ActionButton>
        <ActionButton onClick={() => navigate('/search')}>
          <StyledIcon as={FaMotorcycle} />
          Two Wheeler
        </ActionButton>
        <ActionButton onClick={() => navigate('/search')}>
          <StyledIcon as={SlCalender} />
          Reserve
        </ActionButton>
      </ActionButtons>
      <InputButton onClick={handleInputButtonClick}> {/* Adding click handler */}
        Where do you want to go?
      </InputButton>
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  flex: 1;
  padding: 16px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 80px;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  height: 50px;
  width: 50px;
  border: 1px solid grey;
  border-radius: 50%;
  margin-left: 10px;
`;

const Name = styled.div`
  margin-right: 16px;
  width: 80px;
  font-size: 30px;
  font-weight: 500;
  color: #333333;
`;

const ActionButtons = styled.div`
  display: flex;
  margin-top: 20px;
`;

const ActionButton = styled.div`
  flex: 1;
  background-color: #e0e0e0;
  margin: 0 5px;
  padding: 10px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: green;
    transform: scale(1.05);
  }
`;

const StyledIcon = styled.div`
  font-size: 40px;
  margin-bottom: 5px;
  color: #333;

  ${ActionButton}:hover & {
    color: #007bff;
    font-size: 45px;
  }
`;

const InputButton = styled.div`
  height: 60px;
  background-color: #f0f0f0;
  text-align: center;
  font-size: 24px;
  padding: 10px;
  margin-top: 20px; /* Adjusted space above the input */
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* Change cursor to pointer */
`;

export default Actionitems;
