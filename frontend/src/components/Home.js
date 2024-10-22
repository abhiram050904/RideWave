import React from 'react';
import styled from 'styled-components';
import Map from './Map';
import Actionitems from './Actionitems';

const Home = () => {
  return (
    <HomeContainer>
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
  flex-direction:column;
  height: 100vh; /* Full height of the viewport */
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
