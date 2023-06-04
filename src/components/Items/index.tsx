import React from 'react';
import { Grid, Typography } from '@mui/material';

import { COLORS, FONTS } from 'shared/consts';
import api from 'api/index';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import Loader from 'components/Loader/inedex';

import Item from './Item/index';

const food = [1, 2, 3, 4, 5, 6, 7];

export interface IProduct {
  id: number;
  title: string;
  imgUrl: string;
  price: number;
  shop: { id: number; lat: number; lng: number };
}

const Items = () => {
  const dispatch = useAppDispatch();

  const [items, setItems] = React.useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const selectedPosition = useAppSelector(
    (state) => state.navigationReducer.currentShop as unknown as number,
  );

  React.useEffect(() => {
    if (selectedPosition) handleItems();
  }, [selectedPosition]);

  const handleItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.getItems(selectedPosition);
      setItems(data);
    } catch (error) {
      console.error('Error while fetching items:', error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        bgcolor={COLORS.BG}
        border={`2px ${COLORS.BORDER} solid`}
        borderRadius={'20px'}
        padding={'20px'}
        marginTop={0}
        justifyContent={'center'}>
        {!selectedPosition && (
          <Typography justifySelf={'center'} alignSelf={'center'} fontSize={FONTS.TITLE}>
            Select a shop to start your order!
          </Typography>
        )}
        {selectedPosition && isLoading ? (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Loader />
          </Grid>
        ) : (
          items.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Item {...item} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Items;
