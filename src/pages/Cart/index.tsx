import { Stack } from '@mui/material';
import CartForm from 'components/CartForm';
import CartItems from 'components/CartItems';
import MainHeader from 'components/MainHeader';
import CartFooter from 'components/CartFooter';

const Cart = () => {
  return (
    <>
      <MainHeader />
      <Stack direction={'row'} alignItems={'stretch'} gap={'20px'} padding={'20px'} width={'100%'}>
        <CartForm />
        <CartItems />
      </Stack>
      <CartFooter />
    </>
  );
};

export default Cart;
