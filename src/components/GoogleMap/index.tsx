import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { Box, Typography, Button } from '@mui/material';

import Loader from 'components/Loader/inedex';

interface GoogleMapComponentProps {
  shopRef: React.MutableRefObject<{ lat: number; lng: number }>;
  customerRef: React.MutableRefObject<{ lat: number; lng: number }>;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ shopRef, customerRef }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(
    null,
  );
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [isRouteActive, setIsRouteActive] = useState<boolean>(false);

  const calculateRoute = async () => {
    if (!customerRef.current || !shopRef.current) {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results: any = await directionsService
      .route({
        origin: shopRef.current,
        destination: customerRef.current,
        travelMode: google.maps.TravelMode.WALKING,
      })
      .catch(() => toast.error('Not possible to create the route'));

    setIsRouteActive(true);
    setDirectionsResponse(results);
    if (
      results &&
      results.routes &&
      results.routes[0] &&
      results.routes[0].legs &&
      results.routes[0].legs[0]
    ) {
      setDistance(results.routes[0].legs[0].distance?.text || '');
      setDuration(results.routes[0].legs[0].duration?.text || '');
    }
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    customerRef.current = { lat: 0, lng: 0 };
    setIsRouteActive(false);
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    const { latLng } = e;
    if (latLng) {
      const newLat = latLng.lat();
      const newLng = latLng.lng();
      customerRef.current = { lat: newLat, lng: newLng };

      if (isRouteActive) {
        calculateRoute();
      }
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  if (!isLoaded) return <Loader />;

  return (
    <Box width={'100%'}>
      <GoogleMap
        center={shopRef.current}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '300px' }}
        onLoad={(map) => setMap(map)}>
        <Marker label={'Shop'} position={shopRef.current} title="Shop position" />
        <Marker
          label={'I'}
          position={customerRef.current}
          onDragEnd={handleMarkerDragEnd}
          draggable
          title="My position"
          zIndex={100}
        />

        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
      <Typography>Distance: {distance}</Typography>
      <Typography>Duration: {duration}</Typography>
      <Button onClick={calculateRoute}>Make route</Button>
      <Button onClick={clearRoute}>Clear Route</Button>
    </Box>
  );
};

export default GoogleMapComponent;
