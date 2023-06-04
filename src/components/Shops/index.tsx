import React from 'react';
import { Stack } from '@mui/material';
import { COLORS } from 'shared/consts';
import api from 'api';
import Loader from 'components/Loader/inedex';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { navigationActions } from 'redux/slices/navigationSlice';

interface IShop {
  id: number;
  name: string;
}

const Shops = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [shops, setShops] = React.useState<IShop[]>([]);

  const selectedPosition = useAppSelector((state) => state.navigationReducer.currentShop);

  const handleSelected = (shop: any) => {
    dispatch(navigationActions.setCurrentShop(shop));
  };

  const handleShops = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.getShops();
      setShops(data);
    } catch (error) {
      console.error('Error while fetching shops:', error);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    handleShops();
  }, []);

  return (
    <Stack
      padding={'20px'}
      gap={'20px'}
      bgcolor={COLORS.BG}
      width={'30%'}
      minHeight={'100vh'}
      border={`2px ${COLORS.BORDER} solid`}
      borderRadius={'20px'}>
      {isLoading ? (
        <Loader />
      ) : (
        shops.map((shop) => (
          <Stack
            onClick={() => handleSelected(shop.id)}
            key={shop.id}
            justifyContent={'center'}
            alignItems={'center'}
            height={'55px'}
            bgcolor={shop.id !== selectedPosition ? COLORS.BG_SECONDARY : COLORS.BORDER}
            width={'100%'}
            border={`2px ${COLORS.BORDER} solid`}
            borderRadius={'20px'}
            sx={{ cursor: 'pointer' }}>
            {shop.name}
          </Stack>
        ))
      )}
    </Stack>
  );
};

export default Shops;
