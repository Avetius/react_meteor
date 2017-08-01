import React from 'react';

// Rubix theme
import { Tab, Row, Col, Nav, NavItem, DropdownButton, MenuItem } from '@sketchpixy/rubix';
import {Navbar} from 'react-bootstrap';
import {FlowRouter} from 'meteor/kadira:flow-router';
import i18next from 'i18next';

import Sticky from './sticky';
import UsersMgmtShared from '/lib/usersMgmtShared';
import BrowserViewUtils from '/client/lib/browserViewUtils';
import Constants from '/client/configs/constants';

import UserMenuDropDown from './userMenuDropdown.js';

class Navigation extends React.Component {

  constructor (...props) {
    super(...props);
    this.state = {
      navBarExpanded: false
    };
  }

  componentDidMount () {
    const {NonReactiveLocalState} = this.props.context();
    NonReactiveLocalState['view.categoryNavTopPosition'] = BrowserViewUtils.getOffsetObj(this.categoryNavWrapper).top;
  }

  setCategoryNavWrapper (elem) {
    this.categoryNavWrapper = elem;
  }

  onNavBarMenuClicked (expand) {
    this.setState({navBarExpanded: expand});
  }

  onCategorySelect (eventKey) {
    this.setState({navBarExpanded: false});
  }

  render () {

    let conceptsCountStr,
      newChangeRequestsCountStr;
    if (!this.props.globalCounts) {
      conceptsCountStr = '';
      newChangeRequestsCountStr = '';
    } else {
      const conceptsCount = this.props.globalCounts.concept;
      const newChangeRequestsCount = this.props.globalCounts.newChangeRequests;
      conceptsCountStr = (!conceptsCount && conceptsCount !== 0) ? '' :` (${conceptsCount})`;
      if (UsersMgmtShared.isCurrentUserSuperAdmin()) {
        newChangeRequestsCountStr = (!newChangeRequestsCount && newChangeRequestsCount !== 0) ? '' : ` (${newChangeRequestsCount})`;
      }
    }
    const topHeaderPanel =
      <div id="top-header" className="row bg-header-img">
        <div className="opacity-plane">
          <div className="col-xs-12">
            {this.props.userId ?
              <div className="row margin-top-sm user-menu-dropdown-container">
                <div className="col-xs-1 col-xs-push-11">
                  <UserMenuDropDown view={this.props.view} userId={this.props.userId} conceptsCountStr={conceptsCountStr} newChangeRequestsCountStr={newChangeRequestsCountStr} />
                </div>
              </div> : ''
            }

            <div className="row">
              <div className="col-xs-12 col-sm-10 col-sm-push-1">
                <div className="row row-vertical-center">
                  <div className="col-xs-6 col-sm-5 col-md-3 padding-right-none">
                    <a href={FlowRouter.path('ico.home')}>
                      <img className="img-responsive" src={Constants.assetsUrls.logoWhite} />
                    </a>
                  </div>
                  <div className="col-xs-6"></div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>;


    let subNavigationPanel;
    if (this.props.subNav) {
      subNavigationPanel =
        <div className="row row-vertical-center" ref={this.setCategoryNavWrapper.bind(this)}>
          <div className="col-sm-2 col-md-2  margin-left-lg hidden-xs hidden-on-mobile-view">
            <a href={FlowRouter.path('ico.home')}>
              <img className="ico-logo" src={Constants.assetsUrls.logoWhite} />
            </a>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9">

            <Nav bsStyle="tabs"
                 className="margin-bottom-negative-1"
                 id="category-nav"
                 onSelect={this.onCategorySelect.bind(this)}
                 activeKey={this.props.subNav.subView}>
              <NavItem className="" eventKey={'ongoing'} href={FlowRouter.path(this.props.subNav.viewToLink, { subView: 'ongoing' })}>
                <strong>Ongoing</strong>
                <span className="badge badge-ico margin-left-md">{ this.props.subNav.categoryCounts.ongoing }</span>
              </NavItem>
              <NavItem eventKey={'upcoming'} href={FlowRouter.path(this.props.subNav.viewToLink, { subView: 'upcoming' })}>
                <strong>Upcoming</strong>
                <span className="badge badge-ico margin-left-md">{ this.props.subNav.categoryCounts.upcoming }</span>
              </NavItem>
              <NavItem eventKey={'finished'} href={FlowRouter.path(this.props.subNav.viewToLink, { subView: 'finished' })}>
                <strong>Finished</strong>
                <span className="badge badge-ico margin-left-md">{ this.props.subNav.categoryCounts.finished }</span>
              </NavItem>
              <NavItem className="pull-right" eventKey={'scam'} href={FlowRouter.path(this.props.subNav.viewToLink, { subView: 'scam' })}>
                <em>Scam</em>
                <span className="badge badge-ico margin-left-md">{ this.props.subNav.categoryCounts.scam }</span>
              </NavItem>
              <NavItem className="pull-right" eventKey={'suspicious'} href={FlowRouter.path(this.props.subNav.viewToLink, { subView: 'suspicious' })}>
                <em>Suspicious</em>
                <span className="badge badge-ico margin-left-md">{ this.props.subNav.categoryCounts.suspicious }</span>
              </NavItem>
            </Nav>

          </div>
        </div>;
    }

    let mobileStatusBar;
    if (this.props.subNav) {
      mobileStatusBar =
        <div id="mobile-status-bar" className="row row-vertical-center flex-horizontal-center">
          <div className="col-xs-3 col-sm-2 padding-horizontal-none">
            <a href="/">
              <img className="img-responsive ico-logo" src={Constants.assetsUrls.logoWhite}/>
            </a>
          </div>
          <div className="col-xs-6 flex-horizontal-center">
            <div className="flex-vertical-center">
            <span className="h4 main-status-title">
              { this.props.subNav.subView ?
                i18next.t('ico.icoStatus.' + this.props.subNav.subView)
                : ''
              }
            </span>
            <span className="badge badge-ico margin-left-md">
              { this.props.subNav.categoryCounts[this.props.subNav.subView] }
            </span>
            </div>
          </div>
          <div className="col-xs-1 col-xs-push-1">
            <Navbar.Toggle />
          </div>
        </div>;
    }

    return (
      <div>
        <Navbar id="category-nav-wrapper" className="bg-primary-gradient"
                onToggle={this.onNavBarMenuClicked.bind(this)}
                expanded={this.state.navBarExpanded}
                fluid>
          {topHeaderPanel}
          <Sticky stickyClasses={['sticked', 'container']}
                        placeHolderHeight="6rem">
            <Navbar.Header>
              {mobileStatusBar}
            </Navbar.Header>
            <Navbar.Collapse>
              {subNavigationPanel}
            </Navbar.Collapse>
          </Sticky>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
