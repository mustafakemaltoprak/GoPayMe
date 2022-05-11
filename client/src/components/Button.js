import React from 'react';
import ClapButton from 'react-clap-button';
import { Icon } from 'semantic-ui-react';

const ClapBtn = () => {
  const onCountChange = ({ count, countTotal }) => {};
  // All Props are Optional
  return (
    <ClapButton
      count={0}
      countTotal={0}
      maxCount={50}
      isClicked={false}
      onCountChange={onCountChange}
  
      iconComponent={(props) => <Icon {...props} size={38} name='heart'/>}
    />
  );
};

 export default ClapBtn
