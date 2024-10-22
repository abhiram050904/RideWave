import React,{useEffect} from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components'
mapboxgl.accessToken = 'pk.eyJ1Ijoia2FydW5hc3JlZSIsImEiOiJjbHpjdndvMjAwMTd3MmlvNzdwbndhbjlmIn0.Wf03dmwZd6FrI3_y1h7v9A';
const Map = () => {

    useEffect(() => {
        // Initialize mapbox map
        const map = new mapboxgl.Map({
          container: "map",
          style: 'mapbox://styles/mapbox/streets-v11', 
          center: [78.9629, 20.5937], 
          zoom: 3,
        });
      }, []);
  return (
    <MapContainer id='map'>
      
    </MapContainer>
  )
}

const MapContainer = styled.div`
  flex: 0.5;
  background-color: lightgray;
`;

export default Map
