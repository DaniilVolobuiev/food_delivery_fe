import { Stack } from '@mui/material';
import Shops from 'components/Shops';
import Items from 'components/Items';
import MainHeader from 'components/MainHeader';

const Main = () => {
  return (
    <>
      <MainHeader />
      <Stack direction={'row'} alignItems={'stretch'} gap={'20px'} padding={'20px'} width={'100%'}>
        <Shops />
        <Items />
      </Stack>
    </>
  );
};

export default Main;
