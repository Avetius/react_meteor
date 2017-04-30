import React from 'react';

import { DropdownButton, MenuItem } from '@sketchpixy/rubix';

export default class UserMenuDropdown extends React.Component {

  render () {
    const dropdownTitle = <span><i className="fa fa-user-circle" aria-hidden="true" /></span>;
    console.log(this.props.view);

    return <div id="user-menu-dropdown-wrapper">
        <DropdownButton
          bsStyle="theme-ico-darker"
          id="user-menu-dropdown-body"
          title={dropdownTitle}
          pullRight
        >
          <MenuItem className={(this.props.view === 'ico.home' || this.props.view === 'ico.index' ) ? 'active' : ''} href={FlowRouter.path('ico.index', { subView: 'ongoing' })}>
            Home
          </MenuItem>
          <MenuItem className={this.props.view === 'ico.concepts' ? 'active' : ''} href={FlowRouter.path('ico.concepts', { subView: 'ongoing' })}>
            Concepts {this.props.conceptsCountStr}
          </MenuItem>
          <MenuItem divider />
          <MenuItem className={this.props.view === 'ico.add' ? 'active' : ''} href={FlowRouter.path('ico.add')}>
            Add
          </MenuItem>
        </DropdownButton>
      </div>;
  }
}
