import React from 'react';
// Rubix theme
import { Nav, NavItem } from '@sketchpixy/rubix';
import {Meteor} from 'meteor/meteor';
import AccountsMgmt from '/client/configs/accountsMgmt';

class Navigation extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      activeKey: 'ico.home'
    };
  }

  handleSelect(selectedKey) {
    this.setState({ activeKey: selectedKey });
  }

  render () {

    let navigation;
    if (AccountsMgmt.isAdmin()) {
      navigation =
        <Nav bsStyle="pills" justified
              className='nav-orange75 padding-vertical-sm padding-horizontal-sm content-elem-bg-color'
              activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>

          <NavItem eventKey={'ico.home'} href="/">ICO index</NavItem>
          <NavItem eventKey={'ico.favourites'} href="#">Favourites</NavItem>
          <NavItem eventKey={'ico.concepts'} href="/admin/concepts">Concepts</NavItem>
          <NavItem eventKey={'404'} href="/admin/edit-ico/31b7cfcc-fb0b-4350-a549-b656370fb079">404</NavItem>
          <NavItem eventKey={'ico.add'} href="/admin/add-ico">Add</NavItem>
        </Nav>
    } else {
      navigation =
        <Nav bsStyle="pills" justified className='nav-orange75 padding-vertical-sm padding-horizontal-sm content-elem-bg-color'
            activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
        <NavItem eventKey={'ico.home'} href="/">ICO index</NavItem>
        <NavItem eventKey={'ico.favourites'} href="#">Favourites</NavItem>
      </Nav>;
    }

    return  (
      <div>{navigation}</div>
    );
  }
}

export default Navigation;
