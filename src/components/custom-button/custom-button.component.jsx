import React from 'react';
import { Button } from 'reactstrap';

import './custom-button.styles.scss';

const CustomButton = ({ children, inverted, ...otherProps }) => (
  <Button className={`${inverted ? 'inverted' : ''} custom-button`} {...otherProps}>
    {children}
  </Button>
);

export default CustomButton;
