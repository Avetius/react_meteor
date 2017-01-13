import React from 'react';
// Rubix theme
import { Nav, NavItem } from '@sketchpixy/rubix';
import {Meteor} from 'meteor/meteor';
import AccountsMgmt from '/client/configs/accountsMgmt';
import {FlowRouter} from 'meteor/kadira:flow-router';

class Navigation extends React.Component {

  constructor (props) {
    super(props);
    const key = FlowRouter.current().route.name || 'ico.home';
    this.state = {
      activeKey: key,
      globalCounts: null
    };
  }

  render () {
    let publishedCountStr, conceptsCountStr;
    if (!this.props.globalCounts) {
      publishedCountStr = conceptsCountStr = '';
    } else {
      const publishedCount = this.props.globalCounts.published;
      publishedCountStr = (!publishedCount && publishedCount !== 0) ? '': ` (${publishedCount})`;
      const conceptsCount = this.props.globalCounts.concepts;
      conceptsCountStr = (!publishedCount && publishedCount !== 0) ? '' :` (${conceptsCount})`;
    }

    let navigation;
    if (AccountsMgmt.isAdmin()) {
      navigation =
        <Nav bsStyle="pills" justified
              className='nav-orange75 padding-vertical-sm padding-horizontal-sm content-elem-bg-color'
              activeKey={this.props.activeKey}>

          <NavItem eventKey={'ico.home'} href="/">ICO index {publishedCountStr}</NavItem>
          <NavItem eventKey={'ico.favourites'} href="#">Favourites</NavItem>
          <NavItem eventKey={'ico.concepts'} href="/admin/concepts">Concepts {conceptsCountStr}</NavItem>
          <NavItem eventKey={'404'} href="/admin/edit-ico/31b7cfcc-fb0b-4350-a549-b656370fb079">404</NavItem>
          <NavItem eventKey={'ico.add'} href="/admin/add-ico">Add</NavItem>
        </Nav>
    } else {
      navigation =
        <Nav bsStyle="pills" justified className='nav-orange75 padding-vertical-sm padding-horizontal-sm content-elem-bg-color'
            activeKey={this.props.activeKey}>
        <NavItem eventKey={'ico.home'} href="/">ICO index {publishedCountStr}</NavItem>
        <NavItem eventKey={'ico.favourites'} href="#">Favourites</NavItem>
      </Nav>;
    }

    return  (
      <div>{navigation}</div>
    );
  }
}

export default Navigation;
