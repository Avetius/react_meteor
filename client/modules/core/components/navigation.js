import React from 'react';
// Rubix theme
import { Tab, Row, Col, Nav, NavItem } from '@sketchpixy/rubix';
import {Meteor} from 'meteor/meteor';
import AccountsMgmt from '/lib/accountsMgmt';
import {FlowRouter} from 'meteor/kadira:flow-router';

class Navigation extends React.Component {

  render () {
    let publishedCountStr, conceptsCountStr;
    if (!this.props.globalCounts) {
      publishedCountStr = conceptsCountStr = '';
    } else {
      const publishedCount = this.props.globalCounts.published;
      publishedCountStr = (!publishedCount && publishedCount !== 0) ? '': ` (${publishedCount})`;
      const conceptsCount = this.props.globalCounts.concept;
      conceptsCountStr = (!publishedCount && publishedCount !== 0) ? '' :` (${conceptsCount})`;
    }

    let mainNavigation;
    if (AccountsMgmt.isCurrentUserAdmin()) {
      mainNavigation =
        <Nav bsStyle="pills"
             id="user-util-nav"
             className='nav-theme-orange padding-vertical-sm padding-horizontal-sm'
             activeKey={this.props.view}>
          <NavItem className="h4" eventKey={'ico.index'} href={FlowRouter.path('ico.index', { subView: 'ongoing' })}>
            <i className="fa fa-list margin-right-sm" aria-hidden="true" />
            ICO index {publishedCountStr}
          </NavItem>
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
      mainNavigation =
        <Nav bsStyle="pills" className='nav-theme-orange padding-vertical-sm padding-horizontal-sm'
           id="user-util-nav"
           activeKey={this.props.view}>
          <NavItem className="h4" eventKey={'ico.index'} href={FlowRouter.path('ico.index', { subView: 'ongoing' })}>
            <i className="fa fa-bars margin-right-sm" aria-hidden="true" />
            ICO index {publishedCountStr}
          </NavItem>
          <NavItem className="h4" eventKey={'ico.favourites'} href="#">
            <i className="fa fa-heart-o margin-right-sm" aria-hidden="true" />
            Favourites
          </NavItem>
        </Nav>;
    }

    const mainFixedNavPanel =
      <div className="row main-fixed-nav-panel full-width bg-theme-darkblue">
        <div className="col-xs-12 col-md-10 col-md-push-1">

          <div className="row row-vertical-center">
            <div className="col-xs-2">
              <img className="img-responsive" src="/ICOindex.com-white.png" />
            </div>
            <div className="col-xs-10">
              {mainNavigation}
            </div>
          </div>

        </div>
      </div>;

    const placeholderForFixedPanel =
      <div className="main-fixed-nav-panel-placeholder"> </div>;


    let subNavigationPanel;
    if (this.props.subNav) {

      subNavigationPanel =
        <div className="row bg-primary-gradient">
          <div className="col-xs-12 col-md-10 col-md-push-1">

            <div className="row">
              <div className="col-md-10 col-md-push-1">
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

          </div>
        </div>;
    }



    return (
      <div>
        {placeholderForFixedPanel}
        {mainFixedNavPanel}
        {subNavigationPanel}
      </div>
    );
  }
}

export default Navigation;
