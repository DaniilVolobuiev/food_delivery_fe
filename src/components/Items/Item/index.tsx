import React from 'react';
import {
  Card,
  Stack,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { cartActions } from 'redux/slices/cartSlice';

interface ItemProps {
  id: number;
  title: string;
  imgUrl: string;
  price: number;
  shop: { id: number };
}

const Item: React.FC<ItemProps> = ({ id, title, imgUrl, price, shop }) => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cartReducer.cart);

  const handleAddToCart = () => {
    if (cartItems.find((item) => item.shop.id !== shop.id)) {
      toast.error('You cannot add products from different shops');
    }
    dispatch(cartActions.addCartItem({ id, title, imgUrl, price, shop }));
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{ height: 150 }}
        image={`${process.env.REACT_APP_BASE_SERVER_URL}/${id}/photo.jpg`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {`Price: ${price}$`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
