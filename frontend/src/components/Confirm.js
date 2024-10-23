import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';
import Map from './Map';
import RideSelector from './Rideselector'; // Ensure the correct import name

const Confirm = () => {
  const [pickupCoords, setPickupCoords] = useState({ longitude: 80.4339, latitude: 16.3067 });
  const [dropCoords, setDropCoords] = useState({ longitude: 80.4339, latitude: 16.3067 });
  const [selectedFare, setSelectedFare] = useState(null); // New state for selected fare

  const navigate = useNavigate();
  const location = useLocation();

  const { pickup, drop } = location.state || {};

  const getCoordinates = async (location, setCoords) => {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?` + 
        new URLSearchParams({
          access_token: "pk.eyJ1Ijoia2FydW5hc3JlZSIsImEiOiJjbTJrMmZuYzIwYXdkMnFyMDBjYmlsMGpzIn0.6uXxxe27ekWu5ELVnFRKpA",
          limit: 1
        })
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        setCoords({ longitude, latitude });
      } else {
        console.log(`Location for ${location} not found`);
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${location}:`, error);
    }
  };

  useEffect(() => {
    if (pickup) getCoordinates(pickup, setPickupCoords);
    if (drop) getCoordinates(drop, setDropCoords);
  }, [pickup, drop]);

  const handleBackClick = () => navigate(-1);

  const handleSubmit = () => {
    navigate('/final', {
      state: {
        pickupCoords,
        dropCoords,
        selectedFare, // Pass selected fare to Finalpage
      },
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <ConfirmContainer>
      <ButtonContainer onClick={handleBackClick}>
        <IoMdArrowRoundBack size={32} />
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ButtonContainer>
      <MapContainer>
        <Map 
          pickupCoordinates={[pickupCoords.longitude, pickupCoords.latitude]} 
          dropCoordinates={[dropCoords.longitude, dropCoords.latitude]} 
        />
      </MapContainer>
      <ContentContainer>
        <Heading>Choose a ride to proceed</Heading>
        <RideSelector 
          pickupCoordinates={[pickupCoords.longitude, pickupCoords.latitude]} 
          dropCoordinates={[dropCoords.longitude, dropCoords.latitude]} 
          onSelectFare={setSelectedFare} // Pass setSelectedFare to RideSelector
        />
        <ConfirmRide onClick={handleSubmit}>Confirm Ride</ConfirmRide>
      </ContentContainer>
    </ConfirmContainer>
  );
};

const ConfirmContainer = styled.div`
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

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 1rem;
`;

const Heading = styled.div`
  background-color: #e0e0e0;
  text-align: center;
  padding: 1rem;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const ConfirmRide = styled.button`
  background-color: black; 
  color: white; 
  padding: 10px 20px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 16px; 
  margin-top: auto; 

  &:hover {
    background-color: #45a049; 
  }
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

export default Confirm;
