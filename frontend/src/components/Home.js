import React from 'react';
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";
import Map from './Map';
import Actionitems from './Actionitems';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/login"); // Navigate to login page
  };

  return (
    <HomeContainer>
      <Header>
        <Heading>RapidWave</Heading>
        <LogoutButton onClick={handleLogout}>
          <FiLogOut />
          <span>LOG OUT</span>
        </LogoutButton>
      </Header>
      <MapContainer>
        <Map />
      </MapContainer>
      <ActionContainer>
        <Actionitems />
      </ActionContainer>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height of the viewport */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between; /* Align items to the sides */
  align-items: center; /* Center vertically */
  padding: 1rem; /* Add some padding */
  background-color: #f8f8f8; /* Optional: background color for the header */
  border-bottom: 1px solid #ddd; /* Optional: bottom border for separation */
`;

const Heading = styled.h1` /* Style the heading */
  font-size: 36px; /* Adjust font size as needed */
  font-weight: bold;
  color: #333; /* Change color if needed */
  margin: 0; /* Remove margin for better alignment */
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;

  span {
    margin-left: 0.5rem; /* Spacing between icon and text */
  }
`;

const MapContainer = styled.div`
  flex: 1; /* This will take 50% of the width */
  height: 100%; /* Full height */
`;

const ActionContainer = styled.div`
  flex: 1; /* This will also take 50% of the width */
  height: 100%; /* Full height */
`;

export default Home;
