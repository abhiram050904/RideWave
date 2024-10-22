import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FydW5hc3JlZSIsImEiOiJjbTJrMmZuYzIwYXdkMnFyMDBjYmlsMGpzIn0.6uXxxe27ekWu5ELVnFRKpA';

const Map = ({ pickupCoordinates, dropCoordinates }) => {
  useEffect(() => {
    // Initialize mapbox map
    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: pickupCoordinates || [78.9629, 20.5937], // Center on pickup if available
      zoom: 10, // Initial zoom level
    });

    // Check if pickupCoordinates are valid
    if (pickupCoordinates && pickupCoordinates.length === 2) {
      addToMap(map, pickupCoordinates, 'green'); // Pickup marker
    } else {
      console.error("Invalid pickup coordinates:", pickupCoordinates);
    }

    // Check if dropCoordinates are valid
    if (dropCoordinates && dropCoordinates.length === 2) {
      addToMap(map, dropCoordinates, 'red'); // Drop marker
    } else {
      console.error("Invalid drop coordinates:", dropCoordinates);
    }

    if(pickupCoordinates && dropCoordinates)
    {
      map.fitBounds([
        pickupCoordinates,
        dropCoordinates
    ],{
      padding:60

    });
    }
    // Clean up the map on unmount
    return () => map.remove();
  }, [pickupCoordinates, dropCoordinates]);

  const addToMap = (map, coordinates, color) => {
    // Check if coordinates are valid before adding a marker
    if (Array.isArray(coordinates) && coordinates.length === 2) {
      const marker = new mapboxgl.Marker({ color })
        .setLngLat(coordinates)
        .addTo(map);

      // Add click event for zooming in
      marker.getElement().addEventListener('click', () => {
        map.flyTo({
          center: coordinates,
          zoom: 15,
          essential: true, // This animation is considered essential with respect to prefers-reduced-motion
        });
      });
    } else {
      console.error("Invalid coordinates for marker:", coordinates);
    }
  };

  return (
    <MapWrapper>
      <MapContainer id="map" />
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh; /* Full height to make sure it covers the screen height */
`;

const MapContainer = styled.div`
  flex: 1;
  height: 100%; /* Ensures it fills the available height */
  width: 100%; /* Full width */
  background-color: lightgray;
`;

export default Map;
