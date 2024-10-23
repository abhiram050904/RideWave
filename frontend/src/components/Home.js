import React from 'react';
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";
import Map from './Map';
import Actionitems from './Actionitems';
import Logo from '../images/logo.png'; // Import your logo image

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/login"); // Navigate to login page
  };

  return (
    <HomeContainer>
      <Header>
        <Brand>
          <img src={Logo} alt="Logo" />
          <Heading>RapidWave</Heading>
        </Brand>
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
  background: linear-gradient(135deg, #ff007f, #7a00ff); /* Reddish-violet gradient */
`;

const Header = styled.div`
  display: flex;
  justify-content: center; /* Center the brand section */
  align-items: center; /* Center items vertically */
  padding: 1rem; /* Add some padding */ 
  border-bottom: 1px solid #ddd; /* Optional: bottom border for separation */
`;

const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem; /* Space between logo and heading */

  img {
    height: 60px; /* Set a specific height */
    width: auto; /* Maintain aspect ratio */
  }
`;

const Heading = styled.h1`
  background: linear-gradient(90deg, #000000, #ff0000); /* Gradient for heading */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem; /* Increased font size */
  text-transform: uppercase;
  margin: 0; /* Remove margin for better alignment */
`;

const LogoutButton = styled.div`
  position: absolute; /* Position logout button to allow it to float right */
  right: 20px; /* Adjust distance from the right */
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  background-color: black; /* Set background to black */
  padding: 10px 15px; /* Add padding for better appearance */
  border-radius: 5px; /* Rounded corners */
  color: white; /* Set text color to white */
  transition: background-color 0.3s ease; /* Transition for hover effect */

  &:hover {
    background-color: red; /* Change to red on hover */
  }

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
