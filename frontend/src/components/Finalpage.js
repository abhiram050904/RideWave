import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Map from './Map';
import { IoMdArrowRoundBack } from "react-icons/io";

const Finalpage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickupCoords, dropCoords, selectedFare } = location.state || {}; // Get fare from state

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Container>
      <ButtonContainer>
        <BackButton onClick={handleBackClick}>
          <IoMdArrowRoundBack size={24} /> Back
        </BackButton>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ButtonContainer>
      <MapContainer>
        <Map
          pickupCoordinates={[pickupCoords.longitude, pickupCoords.latitude]}
          dropCoordinates={[dropCoords.longitude, dropCoords.latitude]}
        />
      </MapContainer>
      <MessageContainer>
        <div>Looking for the nearby driver...</div>
        {selectedFare !== null && ( // Conditionally render the fare if it's available
          <FareDisplay>
            Selected Fare: ₹{selectedFare.toFixed(2)}
          </FareDisplay>
        )}
      </MessageContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  display: flex;
  align-items: center;
  height: 3rem;
  cursor: pointer;
`;

const MapContainer = styled.div`
  height: 50vh;
  position: sticky;
  top: 0;
  width: 100%;
`;

const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FareDisplay = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: green;
  margin-top: 1rem;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  background-color: #f44336; 
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin-left: auto;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #e53935; 
  }
`;

export default Finalpage;
