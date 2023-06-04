import { Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { PATH } from 'router';
import { FONTS } from 'shared/consts';

const MainHeader = () => {
  return (
    <Stack direction={'row'} gap={'20px'} margin={'20px'} fontSize={FONTS.TITLE}>
      <Link to={PATH.CART}>Cart</Link>
      <Divider orientation={'vertical'} flexItem={true} />
      <Link to={PATH.MAIN}>Main page</Link>
    </Stack>
  );
};

export default MainHeader;
