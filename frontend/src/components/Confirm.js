import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoMdArrowRoundBack } from "react-icons/io"; // Back icon from react-icons
import { useNavigate, useLocation } from 'react-router-dom'; // To navigate and retrieve state
import Map from './Map';
import RideSelector from './Rideselector'; // Import the RideSelector component

const Confirm = () => {
  const [pickupCoords, setPickupCoords] = useState({ longitude: 80.4339, latitude: 16.3067 }); // Default coordinates
  const [dropCoords, setDropCoords] = useState({ longitude: 80.4339, latitude: 16.3067 }); // Default coordinates

  const navigate = useNavigate();
  const location = useLocation(); // To retrieve the state from navigate

  // Destructure pickup and drop locations from state
  const { pickup, drop } = location.state || {}; // Use empty object fallback in case state is undefined

  const getCoordinates = (location, setCoords) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?` + 
      new URLSearchParams({
        access_token: "pk.eyJ1Ijoia2FydW5hc3JlZSIsImEiOiJjbTJrMmZuYzIwYXdkMnFyMDBjYmlsMGpzIn0.6uXxxe27ekWu5ELVnFRKpA",
        limit: 1
      })
    )
    .then(response => response.json())
    .then(data => {
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        setCoords({ longitude, latitude });
        console.log(`Coordinates of ${location}: Latitude: ${latitude}, Longitude: ${longitude}`);
      } else {
        console.log(`Location for ${location} not found`);
      }
    })
    .catch(error => console.error(`Error fetching coordinates for ${location}:`, error));
  };

  useEffect(() => {
    // Only fetch coordinates if pickup and drop are defined
    if (pickup) {
      getCoordinates(pickup, setPickupCoords);
    }
    if (drop) {
      getCoordinates(drop, setDropCoords);
    }
  }, [pickup, drop]);

  const handleBackClick = () => {
    navigate(-1); // This navigates the user back to the previous page
  };

  const handleSubmit = () => {
    // Handle the submit logic here
    console.log('Ride selected!'); // Replace this with your submit logic
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); // Navigate to the login page after logout
  };

  return (
    <ConfirmContainer>
      <ButtonContainer onClick={handleBackClick}>
        <IoMdArrowRoundBack size={32} />
      </ButtonContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      <MapContainer>
        <Map 
          pickupCoordinates={[pickupCoords.longitude, pickupCoords.latitude]} 
          dropCoordinates={[dropCoords.longitude, dropCoords.latitude]} 
        />
      </MapContainer>
      <ContentContainer>
        <Heading>Choose a ride to proceed</Heading>
        {/* Render RideSelector component */}
        <RideSelector 
          pickupCoordinates={[pickupCoords.longitude, pickupCoords.latitude]} 
          dropCoordinates={[dropCoords.longitude, dropCoords.latitude]} 
        />
        <ConfirmRide onClick={handleSubmit}>Confirm Ride</ConfirmRide> {/* Add the submit button */}
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
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  height: 3rem;
  cursor: pointer;
`;

// Map container: it should take 50% of the screen and remain sticky
const MapContainer = styled.div`
  height: 50vh; /* 50% of viewport height */
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
  background-color: black; /* Green background */
  color: white; /* White text */
  padding: 10px 20px; /* Padding */
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 16px; /* Font size */
  margin-top: auto; /* Push to the bottom */
  
  &:hover {
    background-color: #45a049; /* Darker green on hover */
  }
`;

const LogoutButton = styled.button`
  background-color: #f44336; /* Red color */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin-left: auto; /* Aligns to the right */
  cursor: pointer;

  &:hover {
    background-color: #d32f2f; /* Darker red on hover */
  }
`;

export default Confirm;
