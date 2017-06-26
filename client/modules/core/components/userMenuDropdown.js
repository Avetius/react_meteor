import React from 'react';
import {Meteor} from 'meteor/meteor';

import UsersMgmtShared from '/lib/usersMgmtShared';

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
      name = UsersMgmtShared.extractName(Meteor.user());
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
          { UsersMgmtShared.isCurrentUserSuperAdmin() || UsersMgmtShared.isCurrentUserContentAdmin() ?
          <div>
            <MenuItem className={this.props.view === 'ico.concepts' ? 'active' : ''} href={FlowRouter.path('ico.concepts', { subView: 'ongoing' })}>
              Concepts {this.props.conceptsCountStr}
            </MenuItem>
            <MenuItem divider />
            <MenuItem className={this.props.view === 'ico.add' ? 'active' : ''} href={FlowRouter.path('ico.add')}>
            Add
            </MenuItem>
          </div> : ''
          }
          <MenuItem divider />
          <MenuItem className={this.props.view === 'change-request.view-all' ? 'active' : ''} href={FlowRouter.path('change-request.view-all')}>
            Change requests
          </MenuItem>
          <MenuItem divider />
          {UsersMgmtShared.isCurrentUserSuperAdmin() ?
            <div>
              <MenuItem className={this.props.view === 'users.manage-admins' ? 'active' : ''} href={FlowRouter.path('users.manage-admins')}>
                Manage admins
              </MenuItem>
            </div> : ''
          }
          <MenuItem href={''} onClick={this.doLogout}>
            Logout
          </MenuItem>
        </DropdownButton>
      </div>;
  }
}
