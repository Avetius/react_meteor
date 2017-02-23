import React from 'react';

// Rubix theme
import { Tab, Row, Col, Nav, NavItem } from '@sketchpixy/rubix';

import {FlowRouter} from 'meteor/kadira:flow-router';
import {Sticky} from 'react-sticky';

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
          <NavItem className="h4" eventKey={'ico.favourites'} href="#">
            <i className="fa fa-heart-o margin-right-sm" aria-hidden="true" />
            Favourites
          </NavItem>
          <NavItem className="h4" eventKey={'ico.concepts'} href={FlowRouter.path('ico.concepts', { subView: 'ongoing' })}>
            Concepts {conceptsCountStr}
          </NavItem>
          <NavItem className="h4" eventKey={'404'} href={FlowRouter.path('404')}>
            404
          </NavItem>
          <NavItem className="h4" eventKey={'ico.add'} href={FlowRouter.path('ico.add')}>
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
          <div className="col-xs-12 col-md-10 col-md-push-1">

            <div className="row row-vertical-center">
              <div className="col-xs-3 padding-right-none">
                <a href={FlowRouter.path('ico.home')}>
                  <img className="img-responsive" src="/ICOindex.com-white.png" />
                </a>
              </div>
              <div className="col-xs-9">
                {userUtilNav}
              </div>
            </div>

          </div>
        </div>
      </div>;


    let subNavigationPanel;
    if (this.props.subNav) {

      subNavigationPanel =
        <Sticky id="category-nav-wrapper" stickyClassName="sticked" onStickyStateChange={this.onSticky}>
          <div className="row bg-primary-gradient row-vertical-center" ref={this.setCategoryNavWrapper.bind(this)}>
            <div className="col-md-2">
              <a href={FlowRouter.path('ico.home')}>
                <img className="ico-logo" src="/ICOindex.com-white.png" />
              </a>
            </div>
            <div className="col-xs-12 col-md-9">

              <Nav bsStyle="tabs"
                   className="padding-horizontal-sm margin-bottom-negative-1"
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
          </div>
        </Sticky>;
    }

    return (
      <div>
        {topHeaderPanel}
        {subNavigationPanel}
      </div>
    );
  }
}

export default Navigation;
