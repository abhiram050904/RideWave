import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCarSide } from 'react-icons/fa'; // Car icon from react-icons
import { FaIndianRupeeSign } from "react-icons/fa6";

const RideSelector = ({ pickupCoordinates, dropCoordinates }) => {
  const [rideDistance, setRideDistance] = useState(0); // Set the initial distance to 0
  const [smallRidePrice, setSmallRidePrice] = useState(0);
  const [largeRidePrice, setLargeRidePrice] = useState(0);
  const [extraLargeRidePrice, setExtraLargeRidePrice] = useState(0);
  const [selectedRide, setSelectedRide] = useState(null); // State to track selected ride

  // Fetch the distance from Mapbox API
  useEffect(() => {
    const fetchRideDistance = async () => {
      if (pickupCoordinates && dropCoordinates) {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropCoordinates[0]},${dropCoordinates[1]}?` +
          new URLSearchParams({
            access_token: "pk.eyJ1Ijoia2FydW5hc3JlZSIsImEiOiJjbTJrMmZuYzIwYXdkMnFyMDBjYmlsMGpzIn0.6uXxxe27ekWu5ELVnFRKpA",
            geometries: 'geojson',
          });
        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log('Mapbox API response:', data); // Log the response for debugging
          if (data.routes && data.routes.length > 0) {
            const distanceInMeters = data.routes[0].distance; // Get the distance in meters from the API response
            setRideDistance(distanceInMeters / 1000); // Convert to kilometers
          } else {
            console.error('No routes found in response');
          }
        } catch (error) {
          console.error('Error fetching ride distance:', error);
        }
      }
    };

    fetchRideDistance();
  }, [pickupCoordinates, dropCoordinates]); // Re-fetch if coordinates change

  // Calculate ride prices dynamically based on ride distance
  useEffect(() => {
    setSmallRidePrice(rideDistance * 20);
    setLargeRidePrice(rideDistance * 40);
    setExtraLargeRidePrice(rideDistance * 60);
  }, [rideDistance]); // Recalculate prices whenever rideDistance changes

  // Handler to set selected ride
  const handleSelectRide = (rideType) => {
    setSelectedRide(rideType);
  };

  return (
    <RideContainer>
      <RideOption
        onClick={() => handleSelectRide('small')}
        isSelected={selectedRide === 'small'} // Check if this ride is selected
      >
        <CarIcon>
          <FaCarSide size={36} />
        </CarIcon>
        <RideDetails>
          <DriverName>Uber small</DriverName>
          <TimeAway>5 min away</TimeAway>
        </RideDetails>
        <RidePrice><FaIndianRupeeSign />{smallRidePrice.toFixed(2)}</RidePrice> {/* Display the calculated price */}
      </RideOption>

      <RideOption
        onClick={() => handleSelectRide('large')}
        isSelected={selectedRide === 'large'} // Check if this ride is selected
      >
        <CarIcon>
          <FaCarSide size={36} />
        </CarIcon>
        <RideDetails>
          <DriverName>Uber large</DriverName>
          <TimeAway>7 min away</TimeAway>
        </RideDetails>
        <RidePrice><FaIndianRupeeSign />{largeRidePrice.toFixed(2)}</RidePrice> {/* Display the calculated price */}
      </RideOption>

      <RideOption
        onClick={() => handleSelectRide('extraLarge')}
        isSelected={selectedRide === 'extraLarge'} // Check if this ride is selected
      >
        <CarIcon>
          <FaCarSide size={36} />
        </CarIcon>
        <RideDetails>
          <DriverName>Uber extra Large</DriverName>
          <TimeAway>10 min away</TimeAway>
        </RideDetails>
        <RidePrice><FaIndianRupeeSign />{extraLargeRidePrice.toFixed(2)}</RidePrice> {/* Display the calculated price */}
      </RideOption>
    </RideContainer>
  );
};

// Ride container styles
const RideContainer = styled.div`
  flex: 1;
  background-color: white;
  padding: 1rem;
  overflow-y: auto; // Enables scrolling for ride options
`;

// Ride option card styles
const RideOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f4f6;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, border 0.2s ease-in-out;
  border: ${(props) => (props.isSelected ? '2px solid white' : 'none')}; // White border when selected

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

export default RideSelector;
