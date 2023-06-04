import { Grid, Typography } from '@mui/material';

import { useAppSelector } from 'redux/hooks';
import { COLORS, FONTS } from 'shared/consts';

import CartItem from './CartItem';

export default function CartItems() {
  const cartItems = useAppSelector((state) => state.cartReducer.cart);

  return (
    <Grid
      container
      spacing={2}
      bgcolor={COLORS.BG}
      border={`2px ${COLORS.BORDER} solid`}
      borderRadius={'20px'}
      padding={'20px'}
      marginTop={0}
      justifyContent={'center'}
      alignItems={'center'}>
      {cartItems.length ? (
        cartItems.map((item) => (
          <Grid item key={item.id}>
            <CartItem {...item} />
          </Grid>
        ))
      ) : (
        <Typography fontSize={FONTS.TITLE}>Add some items to the cart!</Typography>
      )}
    </Grid>
  );
}
