import React from 'react';

// Rubix theme
import { Tab, Row, Col, Nav, NavItem } from '@sketchpixy/rubix';
import {Navbar} from 'react-bootstrap';
import {FlowRouter} from 'meteor/kadira:flow-router';
import i18next from 'i18next';

import Sticky from './sticky';
import AccountsMgmt from '/lib/accountsMgmt';
import BrowserViewUtils from '/client/lib/browserViewUtils';

class Navigation extends React.Component {

  componentDidMount () {
    const {NonReactiveLocalState} = this.props.context();
    NonReactiveLocalState['view.categoryNavTopPosition'] = BrowserViewUtils.getOffsetObj(this.categoryNavWrapper).top;
  }

  setCategoryNavWrapper (elem) {
    this.categoryNavWrapper = elem;
  }

  render () {

    let conceptsCountStr;
    if (!this.props.globalCounts) {
      conceptsCountStr = '';
    } else {
      const conceptsCount = this.props.globalCounts.concept;
      conceptsCountStr = (!conceptsCount && conceptsCount !== 0) ? '' :` (${conceptsCount})`;
    }

    let userUtilNav;
    if (AccountsMgmt.isCurrentUserAdmin()) {
      userUtilNav =
        <Nav bsStyle="pills"
             id="user-util-nav"
             className='nav-theme-orange padding-vertical-sm padding-horizontal-sm pull-right'
             activeKey={this.props.view}>
          <NavItem className="" eventKey={'ico.favourites'} href="#">
            <i className="fa fa-heart-o margin-right-sm" aria-hidden="true" />
            Favourites
          </NavItem>
          <NavItem className="" eventKey={'ico.concepts'} href={FlowRouter.path('ico.concepts', { subView: 'ongoing' })}>
            Concepts {conceptsCountStr}
          </NavItem>
          <NavItem className="" eventKey={'404'} href={FlowRouter.path('404')}>
            404
          </NavItem>
          <NavItem className="" eventKey={'ico.add'} href={FlowRouter.path('ico.add')}>
            Add
          </NavItem>
        </Nav>
    } else {
      userUtilNav =
        <Nav bsStyle="pills" className='nav-theme-orange padding-vertical-sm padding-horizontal-sm  pull-right'
           id="user-util-nav"
           activeKey={this.props.view}>
          {/* Favourites won't be public now
            <NavItem className="h4" eventKey={'ico.favourites'} href="#">
              <i className="fa fa-heart-o margin-right-sm" aria-hidden="true" />
              Favourites
            </NavItem>
          */}
        </Nav>;
    }

    const topHeaderPanel =
      <div id="top-header" className="row bg-header-img">
        <div className="opacity-plane row-vertical-center">
          <div className="col-xs-12 col-sm-10 col-sm-push-1">

            <div className="row row-vertical-center">
              <div className="col-xs-6 col-sm-5 col-md-3 padding-right-none">
                <a href={FlowRouter.path('ico.home')}>
                  <img className="img-responsive" src="/ICOindex.com-white.png" />
                </a>
              </div>
              <div className="col-xs-6">
                {userUtilNav}
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
              <img className="ico-logo" src="/ICOindex.com-white.png" />
            </a>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9">

            <Nav bsStyle="tabs"
                 className="margin-bottom-negative-1"
                 id="category-nav"
                 activeKey={this.props.subNav.subView}>
              <NavItem className="" eventKey={'ongoing'} href={FlowRouter.path(this.props.subNav.view, { subView: 'ongoing' })}>
                <strong>Ongoing</strong>
                <span className="badge badge-ico margin-left-md">{ this.props.subNav.categoryCounts.ongoing }</span>
              </NavItem>
              <NavItem eventKey={'upcoming'} href={FlowRouter.path(this.props.subNav.view, { subView: 'upcoming' })}>
                <strong>Upcoming</strong>
                <span className="badge badge-ico margin-left-md">{ this.props.subNav.categoryCounts.upcoming }</span>
              </NavItem>
              <NavItem eventKey={'finished'} href={FlowRouter.path(this.props.subNav.view, { subView: 'finished' })}>
                <strong>Finished</strong>
                <span className="badge badge-ico margin-left-md">{ this.props.subNav.categoryCounts.finished }</span>
              </NavItem>
              <NavItem className="pull-right" eventKey={'scam'} href={FlowRouter.path(this.props.subNav.view, { subView: 'scam' })}>
                <em>Scam</em>
                <span className="badge badge-ico margin-left-md">{ this.props.subNav.categoryCounts.scam }</span>
              </NavItem>
              <NavItem className="pull-right" eventKey={'suspicious'} href={FlowRouter.path(this.props.subNav.view, { subView: 'suspicious' })}>
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
              <img className="img-responsive ico-logo" src="/ICOindex.com-white.png"/>
            </a>
          </div>
          <div className="col-xs-6 flex-horizontal-center">
            <div className="flex-vertical-center">
            <span className="h4 main-status-title">
              {i18next.t('ico.icoStatus.' + this.props.subNav.subView)}
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
        <Navbar id="category-nav-wrapper" className="bg-primary-gradient" fluid>
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
