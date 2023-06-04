import { useEffect, useRef, useState } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppSelector } from 'redux/hooks';
import { COLORS } from 'shared/consts';
import api from 'api/index';
import GoogleMapComponent from 'components/GoogleMap';
import Loader from 'components/Loader/inedex';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export default function CartForm() {
  const [kostyl, setKostyl] = useState(false);

  const cart = useAppSelector((state) => state.cartReducer.cart);

  const shopRef = useRef<{ lat: number; lng: number }>({ lat: 30, lng: 30 });
  const customerRef = useRef<{ lat: number; lng: number }>({ lat: 30, lng: 30 });
  const autocompleteRef = useRef<google.maps.places.Autocomplete>();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (user) => {
    const orderData = { user: user, orderItems: cart };
    await api
      .postOrder(orderData)
      .then(() =>
        toast.success('Your order has been submitted', { position: toast.POSITION.TOP_CENTER }),
      );
  };

  useEffect(() => {
    if (cart.length) {
      shopRef.current.lat = cart[0].shop.lat;
      shopRef.current.lng = cart[0].shop.lng;
      setKostyl(!kostyl);
    }
  }, []);

  if (!isLoaded) return <Loader />;

  return (
    <Box
      padding={'20px'}
      gap={'20px'}
      bgcolor={COLORS.BG}
      width={'40%'}
      minHeight={'100vh'}
      height={'100%'}
      border={`2px ${COLORS.BORDER} solid`}
      borderRadius={'20px'}>
      <GoogleMapComponent shopRef={shopRef} customerRef={customerRef} />
      <form id="order-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={'20px'}>
          <Box>
            <Typography>Name</Typography>
            <TextField fullWidth variant="filled" {...register('name', { required: true })} />
            {errors.name && <span>Name is required</span>}
          </Box>
          <Box>
            <Typography>Email</Typography>
            <TextField fullWidth variant="filled" {...register('email', { required: true })} />
            {errors.email && <span>Email is required</span>}
          </Box>
          <Box>
            <Typography>Phone</Typography>
            <TextField fullWidth variant="filled" {...register('phone', { required: true })} />
            {errors.phone && <span>Phone is required</span>}
          </Box>
          <Box>
            <Typography>Address</Typography>
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={() => {
                const place = autocompleteRef.current?.getPlace();
                setKostyl(!kostyl);
                if (place) {
                  customerRef.current = {
                    lat: place.geometry?.location?.lat() || 0,
                    lng: place.geometry?.location?.lng() || 0,
                  };
                }
              }}>
              <TextField fullWidth variant="filled" {...register('address', { required: true })} />
            </Autocomplete>
            {errors.address && <span>Address is required</span>}
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
