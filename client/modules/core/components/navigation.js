import React from 'react';
// Rubix theme
import { Nav, NavItem } from '@sketchpixy/rubix';

const navInstance = () => (
  <Nav bsStyle="pills" className='nav-orange75 padding-vertical-sm padding-horizontal-sm content-elem-bg-color'
       activeKey={1} onSelect={handleSelect}>
    <NavItem eventKey={1} href="/">Home</NavItem>
    <NavItem eventKey={2} href="#">Favourite</NavItem>
    <NavItem eventKey={3} href="/admin/edit-ico/41b7cfcc-fb0b-4350-a549-b656370fb079">Edit (tmp)</NavItem>
    <NavItem eventKey={3} href="/admin/edit-ico/31b7cfcc-fb0b-4350-a549-b656370fb079">NotFound (tmp)</NavItem>
    <NavItem eventKey={4} href="/admin/add-ico">Add</NavItem>

  </Nav>
);

function handleSelect(selectedKey) {
  console.log('selected ', selectedKey);
}

 export default navInstance;
