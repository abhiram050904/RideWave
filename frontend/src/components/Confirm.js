import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaCarSide } from 'react-icons/fa'; // Car icon from react-icons
import { IoMdArrowRoundBack } from "react-icons/io"; // Back icon from react-icons
import { useNavigate, useLocation } from 'react-router-dom'; // To navigate and retrieve state
import Map from './Map';

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

  return (
    <ConfirmContainer>
      <ButtonContainer onClick={handleBackClick}>
        <IoMdArrowRoundBack size={32} />
      </ButtonContainer>
      <Map pickupCoordinates={[pickupCoords.longitude, pickupCoords.latitude]} dropCoordinates={[dropCoords.longitude, dropCoords.latitude]} />
      <Heading>Choose a ride to proceed</Heading>
      <RideContainer>
        <RideOption>
          <CarIcon>
            <FaCarSide size={36} />
          </CarIcon>
          <RideDetails>
            <DriverName>Uber small</DriverName>
            <TimeAway>5 min away</TimeAway>
          </RideDetails>
          <RidePrice>$15.00</RidePrice>
        </RideOption>

        <RideOption>
          <CarIcon>
            <FaCarSide size={36} />
          </CarIcon>
          <RideDetails>
            <DriverName>Uber large</DriverName>
            <TimeAway>7 min away</TimeAway>
          </RideDetails>
          <RidePrice>$20.00</RidePrice>
        </RideOption>

        <RideOption>
          <CarIcon>
            <FaCarSide size={36} />
          </CarIcon>
          <RideDetails>
            <DriverName>Uber extra Large</DriverName>
            <TimeAway>10 min away</TimeAway>
          </RideDetails>
          <RidePrice>$18.00</RidePrice>
        </RideOption>
      </RideContainer>
      <ConfirmButton>Confirm Ride</ConfirmButton>
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

const Heading = styled.div`
  background-color: #e0e0e0;
  text-align: center;
  padding: 1rem;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const RideContainer = styled.div`
  flex: 1;
  background-color: white;
  padding: 1rem;
`;

const RideOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f4f6;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CarIcon = styled.div`
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
`;

const RideDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const DriverName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const TimeAway = styled.div`
  font-size: 16px;
  color: #555;
`;

const RidePrice = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #111;
`;

const ConfirmButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  height: 8.5rem;
  width: 98%;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 1rem;
  font-size: 22px;

  &:hover {
    background-color: #333;
  }
`;

export default Confirm;
