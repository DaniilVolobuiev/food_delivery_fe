import { Button, Stack, Typography } from '@mui/material';

import { useAppSelector } from 'redux/hooks';
import { FONTS } from 'shared/consts';

const CartFooter = () => {
  const totalPrice = useAppSelector((state) => state.cartReducer.totalPrice) ?? 0;

  return (
    <Stack
      direction={'row'}
      gap={'20px'}
      margin={'20px'}
      fontSize={FONTS.TITLE}
      alignItems={'center'}
      justifyContent={'end'}>
      <Typography>Total price: {totalPrice}$</Typography>
      <Button type="submit" form="order-form" variant="contained">
        Submit
      </Button>
    </Stack>
  );
};

export default CartFooter;
