import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCarSide } from 'react-icons/fa'; // Car icon from react-icons
import { FaIndianRupeeSign } from "react-icons/fa6";

const RideSelector = ({ pickupCoordinates, dropCoordinates, onSelectFare }) => {
  const [rideDistance, setRideDistance] = useState(0);
  const [prices, setPrices] = useState({
    small: 0,
    large: 0,
    extraLarge: 0
  });
  const [selectedRide, setSelectedRide] = useState(null);

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
          if (data.routes && data.routes.length > 0) {
            const distanceInMeters = data.routes[0].distance;
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
  }, [pickupCoordinates, dropCoordinates]);

  useEffect(() => {
    const calculatedPrices = {
      small: rideDistance * 20,
      large: rideDistance * 40,
      extraLarge: rideDistance * 60
    };
    setPrices(calculatedPrices);
    if (selectedRide) {
      onSelectFare(calculatedPrices[selectedRide]); // Pass selected fare to parent
    }
  }, [rideDistance, selectedRide, onSelectFare]);

  const handleSelectRide = (rideType) => {
    setSelectedRide(rideType);
    onSelectFare(prices[rideType]); // Pass selected fare to parent
  };

  return (
    <RideContainer>
      {['small', 'large', 'extraLarge'].map((rideType, index) => (
        <RideOption
          key={rideType}
          onClick={() => handleSelectRide(rideType)}
          isSelected={selectedRide === rideType}
        >
          <CarIcon>
            <FaCarSide size={36} />
          </CarIcon>
          <RideDetails>
            <DriverName>Uber {rideType}</DriverName>
            <TimeAway>{5 + index * 2} min away</TimeAway>
          </RideDetails>
          <RidePrice><FaIndianRupeeSign />{prices[rideType].toFixed(2)}</RidePrice>
        </RideOption>
      ))}
    </RideContainer>
  );
};

const RideContainer = styled.div`
  flex: 1;
  background-color: white;
  padding: 1rem;
  overflow-y: auto;
`;

const RideOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.isSelected ? '#e0f7fa' : '#f3f4f6')};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  transform: ${(props) => (props.isSelected ? 'scale(1.05)' : 'scale(1)')};

  &:hover {
    transform: scale(1.03);
  }
`;

const CarIcon = styled.div`
  margin-right: 1rem;
`;

const RideDetails = styled.div`
  flex: 1;
`;

const DriverName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const TimeAway = styled.div`
  font-size: 14px;
  color: gray;
`;

const RidePrice = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export default RideSelector;
