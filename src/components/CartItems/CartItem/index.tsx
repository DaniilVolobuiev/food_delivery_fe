import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Card,
  Stack,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { cartActions } from 'redux/slices/cartSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IProduct } from '@components/Items';

const CartItem = React.memo(({ id, title, imgUrl, price }: IProduct) => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cartReducer.cart);

  const count = cart.find((obj) => obj.id === id)?.count;

  const handleIncrement = () => {
    dispatch(cartActions.plusItem({ id }));
  };

  const handleDecrement = () => {
    if (count && count > 0) {
      dispatch(cartActions.minusItem({ id }));
    }
  };

  const handleRemove = () => {
    dispatch(cartActions.removeItem({ id }));
  };

  return (
    <Stack>
      <Card sx={{ position: 'relative' }}>
        <Box position={'absolute'} top={'5px'} right={'5px'}>
          <IconButton onClick={handleRemove}>
            <DeleteForeverIcon fontSize="large" />
          </IconButton>
        </Box>
        <Stack direction={'row'}>
          <CardMedia
            component="img"
            sx={{ width: 200, height: 200 }}
            alt="green iguana"
            image={`${process.env.REACT_APP_BASE_SERVER_URL}/${id}/photo.jpg`}
          />
          <Stack>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {count && price * count}$
              </Typography>
            </CardContent>
            <CardActions>
              <TextField
                fullWidth
                value={count}
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end" sx={{ marginRight: '15px' }}>
                      <Stack direction={'row'}>
                        <IconButton onClick={handleIncrement}>
                          <ArrowDropUpIcon />
                        </IconButton>
                        <IconButton onClick={handleDecrement}>
                          <ArrowDropDownIcon />
                        </IconButton>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
              />
            </CardActions>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
});

export default CartItem;
