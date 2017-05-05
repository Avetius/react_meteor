import React from 'react';
import {Meteor} from 'meteor/meteor';

import AccountsMgmt from '/lib/accountsMgmt';

import { DropdownButton, MenuItem } from '@sketchpixy/rubix';

export default class UserMenuDropdown extends React.Component {

  doLogout (event) {
    event.preventDefault();
    Meteor.logout();
  }

  render () {
    const dropdownTitle = <span><i className="fa fa-user-circle" aria-hidden="true" /></span>;

    let name;
    if (this.props.userId && Meteor.user()) {
      name = AccountsMgmt.extractName(Meteor.user());
    } else {
      name = null;
    }

    return <div id="user-menu-dropdown-wrapper">
        <DropdownButton
          bsStyle="theme-ico-darker"
          id="user-menu-dropdown-body"
          title={dropdownTitle}
          pullRight
        >
          <div className="text-center">
            <span className="fg-black h5">{ name }</span>
          </div>
          <MenuItem divider />
          <MenuItem className={(this.props.view === 'ico.home' || this.props.view === 'ico.index' ) ? 'active' : ''} href={FlowRouter.path('ico.index', { subView: 'ongoing' })}>
            Home
          </MenuItem>
          <MenuItem className={(this.props.view === 'ico.management') ? 'active' : ''} href={FlowRouter.path('ico.management')}>
            Your ICO(s)
          </MenuItem>
          <MenuItem className={this.props.view === 'ico.concepts' ? 'active' : ''} href={FlowRouter.path('ico.concepts', { subView: 'ongoing' })}>
            Concepts {this.props.conceptsCountStr}
          </MenuItem>
          <MenuItem divider />
          <MenuItem className={this.props.view === 'ico.add' ? 'active' : ''} href={FlowRouter.path('ico.add')}>
            Add
          </MenuItem>
          <MenuItem divider />
          <MenuItem href={''} onClick={this.doLogout}>
            Logout
          </MenuItem>
        </DropdownButton>
      </div>;
  }
}
