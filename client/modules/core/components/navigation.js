import React from 'react';
// Rubix theme
import { Nav, NavItem } from '@sketchpixy/rubix';
import {Meteor} from 'meteor/meteor';

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
    if (Meteor.userId()) {
      navigation =
        <Nav bsStyle="pills" justified
              className='nav-orange75 padding-vertical-sm padding-horizontal-sm content-elem-bg-color'
              activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>

          <NavItem eventKey={'ico.home'} href="/">Home</NavItem>
          <NavItem eventKey={'ico.favourites'} href="#">Favourite</NavItem>
          <NavItem eventKey={'ico.edit'} href="/admin/edit-ico/41b7cfcc-fb0b-4350-a549-b656370fb079">Edit
            (tmp)</NavItem>
          <NavItem eventKey={'404'} href="/admin/edit-ico/31b7cfcc-fb0b-4350-a549-b656370fb079">NotFound (tmp)</NavItem>
          <NavItem eventKey={'ico.add'} href="/admin/add-ico">Add</NavItem>
        </Nav>
    } else {
      navigation =
        <Nav bsStyle="pills" justified className='nav-orange75 padding-vertical-sm padding-horizontal-sm content-elem-bg-color'
            activeKey={this.state.activeKey} onSelect={this.handleSelect.bind(this)}>
        <NavItem eventKey={'ico.home'} href="/">Home</NavItem>
        <NavItem eventKey={'ico.favourites'} href="#">Favourite</NavItem>
      </Nav>;
    }

    return  (
      <div>{navigation}</div>
    );
  }
}

export default Navigation;
