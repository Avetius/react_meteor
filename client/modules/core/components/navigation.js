import React from 'react';
// Rubix theme
import { Nav, NavItem } from '@sketchpixy/rubix';

const navInstance = () => (
  <Nav bsStyle="pills" className='nav-orange75 padding-vertical-sm padding-horizontal-sm content-elem-bg-color'
       activeKey={1} onSelect={handleSelect}>
    <NavItem eventKey={1} href="/">Home</NavItem>
    <NavItem eventKey={2} href="#">Favourite</NavItem>
  </Nav>
);

function handleSelect(selectedKey) {
  console.log('selected ', selectedKey);
}

 export default navInstance;
