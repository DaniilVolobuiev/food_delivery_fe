import React from 'react';
import { Stack } from '@mui/system';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="200"
        visible={true}
      />
    </Stack>
  );
};

export default Loader;
